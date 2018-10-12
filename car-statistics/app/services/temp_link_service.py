from sys import getsizeof

from flask import url_for

from app import app
from app.services.mail_service import send_email
from app.services.token_service import generate_confirmation_token
from app.services.utils import temp_file, dataset_to_excel


def send_to_user(dataset_id):
    file_data = dataset_to_excel(dataset_id)
    if file_data and getsizeof(file_data) > app.config['UPLOAD_LIMIT']:
        return send_templink(dataset_id)
    else:
        return send_user_file(dataset_id)


def send_templink(dataset_id):
    token = generate_confirmation_token(temp_file(dataset_id))
    subject = "Download file by clicking on the link"
    recover_url = url_for(
        'index', _external=True) + \
                  'api/temp_link/' + \
                  token.decode('utf-8')
    html = f'Download file by clicking on the link {recover_url}'
    send_email('hannashymanska@gmail.com', subject, html)
    return 'Download file by clicking on the link'


def send_user_file(dataset_id):
    pass