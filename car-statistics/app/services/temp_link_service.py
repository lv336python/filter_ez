"""
Module for sending templink
"""
from app import app
from app.services.mail_service import send_email
from app.services.token_service import generate_confirmation_token
from app.services.utils import temp_file, dataset_to_excel
from flask import url_for
from sys import getsizeof


def send_to_user(dataset_id):
    """
    Function send templink or file to user which depends on size file_data.
    :param dataset_id:
    :return: link or file
    """
    file_data = dataset_to_excel(dataset_id)
    if file_data and getsizeof(file_data) > app.config['UPLOAD_LIMIT']:
        return send_templink(dataset_id)
    else:
        return send_user_file()


def send_templink(dataset_id):
    """
    Function generate token and send link to user mail.
    :param dataset_id:
    :return: link
    """
    token = generate_confirmation_token(temp_file(dataset_id))
    subject = "Download file by clicking on the link"
    recover_url = url_for(
        'index', _external=True) + \
                  'api/temp_link/' + \
                  token.decode('utf-8')
    html = f'Download file by clicking on the link {recover_url}'
    send_email('hannashymanska@gmail.com', subject, html)
    return 'Link send'


def send_user_file():
    return 'File send'