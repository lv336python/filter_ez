'''
Module for mail sending function
'''
from smtplib import SMTPException
from flask import session
from flask_mail import Message, Attachment

from app import app, mail, celery, socketio, logger
from app.helper import DateTimeManager

@celery.task
def notify_user(result, room_id):
    """
    Sends user a notification through socket about his request of sending results
    on email being satisfied
    :param result:
    :param room_id:
    :return:
    """
    socketio.emit('notification', {'status': result, 'data': 'File sent'}, room=room_id)


@celery.task
def send(msg):
    """
    Sends previously generated message
    :param msg:
    :return:
    """
    try:
        mail.send(msg)
        return "Success"
    except SMTPException:
        return "Error"


def send_email(to_whom, subject, template):
    """
    Accepts destination email, subject and text which are sending
    :param to_whom:
    :param subject:
    :param template:
    :return:
    """
    rec = to_whom if isinstance(to_whom, list) else [to_whom]
    msg = Message(
        subject,
        recipients=rec,
        html=template,
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    user_id = int(session.get('user_id', 0))
    if user_id:
        send.apply_async([msg], serializer='pickle', link=notify_user.s(user_id))
    else:
        send.apply_async([msg], serializer='pickle')


def send_result_to_mail(recipients, file_name, file_content):
    """
    Creates message object and gives task to celery worker to send this message
    :param recipients: list of email addresses
    :param file_name: name of file to send
    :param file_content: bytes of file
    :return:
    """
    msg = Message(
        subject="Your file has been processed!",
        sender=("CStats", app.config['MAIL_DEFAULT_SENDER']),
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
        send.apply_async([msg], serializer='pickle', link=notify_user.s(user_id))
    else:
        send.apply_async([msg], serializer='pickle')


def notify_admin(message, error_level):
    """
    Function which invokes celery worker to send a mail with a given error message
    to administrator mail given in configuration file
    :param message:
    :param error_level:
    :return:
    """
    msg = Message(
        subject=f'Error occurred, level {error_level}',
        sender=("CStats", app.config['MAIL_DEFAULT_SENDER']),
        recipients=[app.config['ADMIN_MAIL']],
        date=DateTimeManager.get_current_time_stamp(),
        body=f"Error has occurred on the server.\n Details: {message}"
    )
    send.apply_async([msg], serializer='pickle')
