'''
Module for mail sending function
'''
from flask_mail import Message

from app import app, mail


def send_email(to_whom, subject, template):
    '''
    Accepts destination email, subject and text which are sending
    :param to:
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
