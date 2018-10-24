"""
TODO
"""
from flask import jsonify, make_response, session
from flask_login import login_required

from app import APP
from app.services.user_data_collection import UserDataCollector


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
    return make_response(jsonify(result), 201)
