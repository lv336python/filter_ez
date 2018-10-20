"""
Module for temp link view
"""
import json
from app.models import Dataset
from flask import send_file, session
from flask import request
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


@app.route("/api/send_file/<int:dataset_id>", methods=['POST'])
def temp_link(dataset_id):
    """
    GET method that sends file to the email address that is
    registered in system.
    :param dataset_id:
    :return: file to the email
    """
    emails = request.get_json()['emails']
    dataset = Dataset.query.get(dataset_id)
    res = send_to_user(dataset, emails)
    return json.dumps({
        'message': res
    }), 201
