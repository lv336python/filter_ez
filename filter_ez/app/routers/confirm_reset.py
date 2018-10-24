'''
Module for confirmation view
'''
import json
import re

from flask import request

from werkzeug.security import generate_password_hash

from app import APP
from app import DB
from app.services.token_service import confirm_token
from app.models import User, UserSchema


@APP.route('/api/password_reset/<token>', methods=['PUT'])
def reset_with_token(token):
    """
    PUT view tht updates password in our DB
    :param token:
    :return: updated password for user
    """
    email = confirm_token(token)

    if not email:
        return json.dumps({
            'message': 'Link has been expired'
        }), 400

    data = request.get_json()
    schema = UserSchema.reg_pass
    password = data['password']

    if not re.match(schema, password):
        return json.dumps({
            'message': 'Password in invalid'
            }), 400

    password = generate_password_hash(data['password'])

    if password:
        user = User.query.filter(User.email == email).first()
        if user:
            user.password = password
            DB.session.add(user)# pylint: disable=E1101
            DB.session.commit()# pylint: disable=E1101
            return json.dumps({
                'token': token
            }), 200

    return json.dumps({
        'message': 'user doesnt exist'
        }), 404
