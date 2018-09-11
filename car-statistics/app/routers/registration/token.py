import jwt
import datetime

from app import app


def generate_confirmation_token(email):
    token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                       app.config['SECRET_KEY'], algorithm='HS256')
    return token


def confirm_token(token):
    decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
    return decoded_token['email']
