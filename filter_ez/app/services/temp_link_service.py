"""
Module for sending templink
"""

from app import app
from app.services.mail_service import send_email, send_result_to_mail
from app.services.token_service import generate_confirmation_token
from app.services.utils import temp_file
from flask import url_for
import os


def send_to_user(dataset, emails):
    """
    Function send templink or file to user which depends on size of file.
    :param dataset_id:
    :param user_id:
    :return: functions sending link or file
    """
    file = temp_file(dataset)
    if file and os.path.getsize(file) > app.config['UPLOAD_LIMIT']:
        return send_templink(file, emails)
    else:
        return send_user_file(file, emails)


def send_templink(path, emails):
    """
    Function generate token and send link to user email.
    :param path:
    :param user_id:
    :return: link
    """
    token = generate_confirmation_token(path)
    subject = "Your file has been processed!"
    recover_url = url_for(
        'index', _external=True) + \
                  'api/temp_link/' + \
                  token.decode('utf-8')
    html = f'Your file has been processed successfully. \
            Please download it from link {recover_url}'
    send_email(emails, subject, html)
    return 'Link send'


def send_user_file(path, emails):
    """
    Function send file to user mail.
    :param path:
    :param user_id:
    :return: file
    """
    send_result_to_mail(emails,
                        'result.xlsx',
                        open(path, 'rb').read())
    return 'File send'
