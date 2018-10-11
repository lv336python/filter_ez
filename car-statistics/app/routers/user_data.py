from app import app
from flask import jsonify, make_response, session

from flask_login import login_required
from app.services.user_data_collection import get_all_user_data


@app.route('/api/userdata', methods=['GET'])
@login_required
def get_all_data():
    user_id = session.get('user_id')
    user_data = get_all_user_data(user_id)
    return make_response(jsonify(user_data), 201)
