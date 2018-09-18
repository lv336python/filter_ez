"""
Module that contains decorator
that validates login view
"""
from functools import wraps

import json

from flask import session, request

from werkzeug.security import check_password_hash

from app.models import User, UserSchema


def login_validator(func):
    """
    Decorator that validates login view
    :param func:
    :return: Eather login view or bad response
    """
    @wraps(func)
    def decorated_view(*args, **kwargs):

        data = request.get_json()
        schema = UserSchema()
        validate = schema.validate({'email': data['email'], 'password': data['password']})
        if validate:
            return json.dumps({
                'message': "Email adress or password is incorrect"
            }), 400

        if 'user_id' in session:
            return json.dumps({
                'message': 'User is already logged in'
            }), 400

        user = User.query.filter(User.email == data['email']).first()

        if not user:
            return json.dumps({
                'message': 'User not found'
            }), 400

        if not user.confirmed:
            return json.dumps({
                'message': f"You need to confirm registration via email {user.email}"
            }), 400

        password = check_password_hash(pwhash=user.password, password=data['password'])

        if not password:
            return json.dumps({
                'message': 'You entered incorrect password'
            }), 400

        return func(*args, **kwargs)
    return decorated_view
