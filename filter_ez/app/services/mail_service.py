"""
    Module with functions for mailing. Uses celery worker for sending
"""
from smtplib import SMTPException
from flask import session
from flask_mail import Message, Attachment

from app.helper import DateTimeManager
from app import APP, MAIL, CELERY, SOCKETIO, LOGGER


@CELERY.task
def notify_user(status, data, room_id):
    """
    Sends user a notification through socket about his request of sending results
    on email being satisfied
    :param data: string data sent to socket client
    :param status: notification status (Fail or Success)
    :param room_id: id of room for sending notification (user id)
    :return: None
    """
    SOCKETIO.emit('notification', {'status': status, 'data': data}, room=room_id)


@CELERY.task
def send(message):
    """
    Sends previously generated message
    :param message: Message object
    :return: Message sending state (Fail, Success)
    """
    try:
        MAIL.send(message)
        return "Success"
    except SMTPException as smpt_error:
        LOGGER.error("Error when trying to send a mail: %s", smpt_error)
        return "Fail"


def send_email(recipient, subject, template):
    """
    Accepts destination email, subject and text which are sending
    :param recipient: list of email addresses or string with one address
    :param subject: subject of mail
    :param template: html template of message body
    :return: None
    """
    recipient = recipient if isinstance(recipient, list) else [recipient]
    message = Message(
        subject,
        recipients=recipient,
        html=template,
        sender=APP.config['MAIL_DEFAULT_SENDER']
    )

    user_id = int(session.get('user_id', 0))
    if user_id:
        send.apply_async([message], serializer='pickle',
                         link=notify_user.s("Result has been sent", user_id))
    else:
        send.apply_async([message], serializer='pickle')


def send_result_to_mail(recipients, file_name, file_content):
    """
    Creates message object and gives task to CELERY worker to send this message
    :param recipients: list of email addresses
    :param file_name: name of file to send
    :param file_content: bytes of file
    :return: None
    """
    message = Message(
        subject="Your file has been processed!",
        sender=("CStats", APP.config['MAIL_DEFAULT_SENDER']),
        recipients=recipients,
        date=DateTimeManager.get_current_time_stamp(),
        body="Congratulations, your file has been processed successfully."
             "Please download it from attached files or from your profile on the site.\n\n"
             "Thank you for using our service",
        attachments=[Attachment(
            filename=file_name,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            data=file_content
        )]
    )

    user_id = int(session.get('user_id', 0))
    if user_id:
        send.apply_async([message], serializer='pickle',
                         link=notify_user.s("Result has been sent", user_id))
    else:
        send.apply_async([message], serializer='pickle')


def notify_admin(message, error_level):
    """
    Function which invokes CELERY worker to send a MAIL with a given error message
    to administrator MAIL given in configuration file.
    :param message: text that shall be sent along with message about error occurrence
    :param error_level: str value (error, critical, ...)
    :return: None
    """
    msg = Message(
        subject=f'Error occurred, level {error_level}',
        sender=("CStats", APP.config['MAIL_DEFAULT_SENDER']),
        recipients=[APP.config['ADMIN_MAIL']],
        date=DateTimeManager.get_current_time_stamp(),
        body=f"Error has occurred on the server.\n Details: {message}"
    )
    send.apply_async([msg], serializer='pickle')
