"""
Module for temp link view
"""
from flask import request, session, send_file, jsonify
from flask_login import login_required

from app import APP
from app.helper import UsersDataset, Status
from app.services.temp_link_service import send_to_user
from app.services.token_service import confirm_token


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
    dataset = UsersDataset(dataset_id)

    if not dataset.is_owner(session['user_id']):
        return jsonify({
            'message': 'Access forbidden'
        }), Status.HTTP_403_FORBIDDEN

    res = send_to_user(dataset, emails)
    return jsonify({
        'message': res
    }), Status.HTTP_200_OK
