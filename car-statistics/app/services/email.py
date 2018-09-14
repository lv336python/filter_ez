'''
Module for mail sending function
'''
from datetime import datetime

from flask_mail import Message, Attachment
from .file_access import get_file
from app import app, mail


def send_email(to_whom, subject, template):
    '''
    Accepts destination email, subject and text which are sending
    :param to_whom:
    :param subject:
    :param template:
    :return:
    '''
    msg = Message(
        subject,
        recipients=[to_whom],
        html=template,
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    mail.send(msg)


def send_file_to_mail(user, filename):
    msg = Message(
        subject="Your file has been processed!",
        sender=("CStats", app.config['MAIL_DEFAULT_SENDER']),
        recipients=[user.email],
        date=datetime.now().timestamp(),
        body="Congratulations, your file has been processed successfully."
             "Please download it from attached files or from your profile on the site."
             "Thank you for using our service",
        attachments=[Attachment(
            filename=filename,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            data=get_file(user, filename)
        )]
    )
    mail.send(msg)


