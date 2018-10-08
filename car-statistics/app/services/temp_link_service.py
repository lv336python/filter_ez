from app import app
import datetime
import jwt


def generate_temp_token(filename):
    """
    Accept user filename and return generated token with expiration date
    :param filename:
    :return: token
    """
    token = jwt.encode({'filename': filename,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                       app.config['SECRET_KEY'],
                       algorithm='HS256')
    return token


def temp_token(token):
    """
    Verify token  and decode it for filename returning
    :param token:
    :return:
    """
    try:
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
    except:
        return None
    if datetime.datetime.utcnow() > datetime.datetime.timedelta():
        return None
    return decoded_token['filename']

