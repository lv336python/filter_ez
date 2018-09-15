"""
This module handles login and logout process
Also tracks whether user is logged in
"""
import json


from flask_login import login_user, login_required, logout_user
from flask import request, session

from werkzeug.security import check_password_hash


from app import app, login_manager
from app.models.user import User, UserSchema

@login_manager.user_loader
def load_user(user_id):
    """
    Method that tracks logged in user
    :param user_id:
    :return: user if is logged in or None
    """
    user = User.query.filter_by(id=user_id).first()

    if user:
        return user
    else:# pylint: disable=R1705
        return None# pylint: disable=R1705


@app.route("/api/login", methods=['POST'])
def login():
    """
    POST method that handles login process
    :return: Eather logged in user
    or incorrect responses
    """
    data = request.get_json()
    if 'user_id' in session:
        return json.dumps({
            'message': 'User is already logged in'
        }), 400
    user = User.query.filter(User.email == data['email']).first()
    schema = UserSchema()
    valid_data_error = schema.dump(user).errors

    if valid_data_error:
        return json.dumps({
            'message': 'Login or password is incorrect'
        }), 400

    password = check_password_hash(pwhash=user.password, password=data['password'])
    if not password:
        return json.dumps({
            'message': 'Login or password not found'
        }), 400

    login_user(user)

    return json.dumps({
        'message': f'User: {data["email"]} is logged in'
    }), 200



@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    """
    POST method that does logout process
    if user logged in
    else works decorator
    :return:
    """
    if 'user_id' in  session:

        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            logout_user()
            return json.dumps({
                'message': f'User: {user.email} is logged out'
            }), 200

    return json.dumps({
        'message': 'bad request'
    }), 400
