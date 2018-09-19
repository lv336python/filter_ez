
'''
Token generation and validation functions
'''

import json
import datetime

import jwt
from app import app


def generate_confirmation_token(email):
    '''
    Accept user email and return generated token with expiration date
    :param email:
    :return: token
    '''
    token = jwt.encode({'email': email,
                        'exp': datetime.datetime.utcnow() \
                               + datetime.timedelta(hours=1)},
                       app.config['SECRET_KEY'],
                       algorithm='HS256')
    return token


def confirm_token(token):
    '''
    Verify token  and decode it for email returning
    :param token:
    :return:
    '''
    try:
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
    except:
        return None
    return decoded_token['email']
