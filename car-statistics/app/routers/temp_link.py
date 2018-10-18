"""
Module for temp link view
"""
import json

from flask import send_file, session

from app import app
from app.services.temp_link_service import send_to_user
from app.services.token_service import confirm_token


@app.route("/api/temp_link/<token>", methods=['GET'])
def get_temp_file(token):
    """
    Generate token and decode it for email returning
    :param token:
    :return: temp link for downloads file to the email
    """
    file_path = confirm_token(token)

    return send_file(file_path, as_attachment=True)


@app.route("/api/send_file/<dataset_id>", methods=['GET'])
def temp_link(dataset_id):
    """
    GET method that sends file to the email address that is
    registered in system.
    :param dataset_id:
    :return: file to the email
    """
    user_id = int(session['user_id'])
    res = send_to_user(dataset_id, user_id)
    return json.dumps({
        'message': res
    }), 201
