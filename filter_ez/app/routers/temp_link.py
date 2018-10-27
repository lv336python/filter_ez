"""
Module for temp link view
"""
import json

from flask import send_file
from flask import request, session
from flask_login import login_required

from app.models import Dataset
from app import APP
from app.services.temp_link_service import send_to_user
from app.services.token_service import confirm_token
from app.helper.constant_status_codes import Status

@APP.route("/api/temp_link/<token>", methods=['GET'])
@login_required
def get_temp_file(token):
    """
    Generate token and decode it for email returning
    :param token:
    :return: temp link for downloads file to the email
    """
    file_path = confirm_token(token)

    return send_file(file_path, as_attachment=True)


@APP.route("/api/send_file/<int:dataset_id>", methods=['POST'])
@login_required
def temp_link(dataset_id):
    """
    GET method that sends file to the email address that is
    registered in system.
    :param dataset_id:
    :return: file to the email
    """
    emails = request.get_json()['emails']
    dataset = Dataset.query.get(dataset_id)

    if not dataset.user_id == int(session['user_id']):
        return json.dumps({
            'message': 'Access forbidden'
        }), Status.HTTP_403_FORBIDDEN

    res = send_to_user(dataset, emails)
    return json.dumps({
        'message': res
    }), 201
