'''
Module for temp_link view
'''
import json

from flask import url_for

from app import app
from app.models import File
from app.services.mail_service import send_email
from app.services.token_service import generate_confirmation_token



@app.route("/api/temp_link", methods=['POST'])
def temp_link():
    """
    POST method that sends temp link reset link
    to the email address that is registered
    in our system
    :return: eather link sent to email or no correct
    response
    """
    # file_id = 3
    # file = File.query.filter(File.id == file_id).first()
    # if not file:
    #     return json.dumps({
    #         'message': f'File not found'
    #     }), 404

    token = generate_confirmation_token('jhbb')
    subject = "Download file by clicking on the link"
    recover_url = url_for(
        'index', _external=True) + \
        'temp_link/' + \
        token.decode('utf-8')
    html = f'Download file by clicking on the link {recover_url}'
    send_email('hannashymanska@gmail.com', subject, html)
    return json.dumps({
        'message': f'Download file by clicking on the link'
        }), 201

