"""
Module that contains decorator
that validates register view
"""

import json
from functools import wraps

from flask import request

from app.models import UserSchema


def register_validator(func):
    """
    Decorator that validates registration view
    :param func:
    :return: Eather register view or bad response
    """
    @wraps(func)
    def decorated_view(*args, **kwargs):
        data = request.get_json()
        email = data['email']
        password = data['password']
        schema = UserSchema()

        validate = schema.validate({'email': email, 'password': password})
        if validate:
            return json.dumps({
                'message': validate
            }), 401

        return func(*args, **kwargs)
    return decorated_view
