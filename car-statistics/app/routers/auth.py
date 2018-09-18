"""
This module handles login and logout process
Also tracks whether user is logged in
"""
import json


from flask_login import login_user, login_required, logout_user
from flask import request, session

from app import app, login_manager
from app.models.user import User
from app.services.login_service import login_validator

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
    return None


@app.route("/api/login", methods=['POST'])
@login_validator
def login():
    """
    POST method that handles login process
    :return: Eather logged in user
    or incorrect responses
    """
    data = request.get_json()
    user = User.query.filter(User.email == data['email']).first()
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
    user = User.query.filter(User.id == session['user_id']).first()
    logout_user()
    return json.dumps({
        'message': f'User: {user.email} is logged out'
        }), 200
