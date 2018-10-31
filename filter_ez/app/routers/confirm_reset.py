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
from app.helper.constant_status_codes import Status


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
        }), Status.HTTP_400_BAD_REQUEST

    data = request.get_json()
    schema = UserSchema.reg_pass
    password = data['password']

    if not re.match(schema, password):
        return json.dumps({
            'message': 'Password in invalid'
            }), Status.HTTP_400_BAD_REQUEST

    password = generate_password_hash(data['password'])

    if password:
        user = User.query.filter(User.email == email).first()
        if user:
            user.password = password
            DB.session.add(user)
            DB.session.commit()
            return json.dumps({
                'token': token
            }), Status.HTTP_200_OK

    return json.dumps({
        'message': 'user doesnt exist'
        }), Status.HTTP_404_NOT_FOUND
