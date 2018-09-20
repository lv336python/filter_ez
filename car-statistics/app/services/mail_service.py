'''
Module for mail sending function
'''
from datetime import datetime

from flask_mail import Message, Attachment

from app.services.file_access import get_file
from app import app, mail, celery
from app.models import File


@celery.task
def send(msg):
    mail.send(msg)


def send_email(to_whom, subject, template):
    """
    Accepts destination email, subject and text which are sending
    :param to_whom:
    :param subject:
    :param template:
    :return:
    """
    msg = Message(
        subject,
        recipients=[to_whom],
        html=template,
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    send.apply_async([msg], serializer='pickle')


def send_result_to_mail(recipients, file_id):
    """
    Creates message object and gives task to celery worker to send this message
    :param recipients: list of email addresses
    :param filename: name of file to send
    :return:
    """
    file = File.query.filter(File.id=file_id)
    path = file.path
    name = file.attributes['name']
    msg = Message(
        subject="Your file has been processed!",
        sender=("CStats", app.config['MAIL_DEFAULT_SENDER']),
        recipients=recipients,
        date=datetime.now().timestamp(),
        body="Congratulations, your file has been processed successfully."
             "Please download it from attached files or from your profile on the site.\n\n"
             "Thank you for using our service",
        attachments=[Attachment(
            filename=name,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            data=get_file(path)
        )]
    )
    send.apply_async([msg], serializer='pickle')
