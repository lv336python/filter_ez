"""
Module that contains decorator
that validates login view
"""
from functools import wraps

import json

from flask import request

from app.models import UserSchema


def data_validator(func):
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
        for key in validate:
            if key:
                return json.dumps({
                    'message': validate[key][0]
                }), 400

        return func(*args, **kwargs)

    return decorated_view
