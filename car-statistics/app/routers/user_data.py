from app import app
from flask import jsonify, make_response, session

from flask_login import login_required
from app.services.user_data_collection import UserDataCollector


@app.route('/api/userdata', methods=['GET'])
@login_required
def get_all_data():
    '''
    View that return all userdata by user id in session
    :return: response with user data JSON object
    '''
    user_id = session.get('user_id')
    user_data = UserDataCollector(user_id)
    result = user_data.get_all_user_data()
    return make_response(jsonify(result), 201)
