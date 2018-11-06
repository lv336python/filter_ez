"""
    Routes for retrieving user data
"""
from flask import session, jsonify
from flask_login import login_required

from app import APP
from app.helper import Status
from app.services.user_data_collection import UserDataCollector
from app.models import Filter


@APP.route('/api/userdata', methods=['GET'])
@login_required
def get_all_data():
    """
    View that return all Users Data by user id in session
    :return: response with user data JSON object
    """
    user_id = session.get('user_id')
    user_data = UserDataCollector(user_id)
    result = user_data.get_all_data()
    return jsonify(result), \
        Status.HTTP_200_OK


@APP.route('/api/preview/<int:filter_id>')
@login_required
def get_filters(filter_id):
    """
    Get filter parameters by filter id
    :return: response with user data JSON object
    """
    filters = Filter.query.get(filter_id)
    if not filters:
        return jsonify({
            "message": 'filter does not exist'
        }), Status.HTTP_404_NOT_FOUND
    filter_params = filters.params
    return jsonify({
        'message': filter_params
    }), Status.HTTP_200_OK
