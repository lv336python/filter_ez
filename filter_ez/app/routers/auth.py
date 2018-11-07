"""
This module handles login and logout process
Also tracks whether user is logged in
"""
import re

from flask_login import login_user, login_required, logout_user
from flask import request, session, url_for, jsonify
from werkzeug.security import check_password_hash, generate_password_hash

from app import APP, LOGIN_MANAGER, REDIS, DB
from app.models import User, UserSchema
from app.services.schema_validate import data_validator
from app.services.mail_service import send_email
from app.services.token_service import generate_confirmation_token, confirm_token
from app.helper import Status, DateTimeManager, DataBaseManager


@LOGIN_MANAGER.user_loader
def load_user(user_id):
    """
    Method that tracks logged in user
    :param user_id:
    :return: user if is logged in or None
    """
    user = DataBaseManager.get_user_by_id(user_id)

    return user


@APP.route("/api/login", methods=['POST'])
@data_validator
def login():
    """
    POST method that handles login process
    :return: Either logged in user
    or incorrect responses
    """
    data = request.get_json()
    email = data['email']

    if 'user_id' in session:
        return jsonify({
            'message': 'User is already logged in'
        }), Status.HTTP_401_UNAUTHORIZED

    user = DataBaseManager.get_user_by_email(email)

    if not user:
        return jsonify({
            'message': 'User not found'
        }), Status.HTTP_404_NOT_FOUND

    if not user.confirmed:
        return jsonify({
            'message': f"You need to confirm registration via email {user.email}"
        }), Status.HTTP_400_BAD_REQUEST

    password = check_password_hash(pwhash=user.password, password=data['password'])

    if not password:
        return jsonify({
            'message': 'You entered incorrect password'
        }), Status.HTTP_400_BAD_REQUEST

    login_user(user)

    return jsonify({
        'message': f'User: {data["email"]} is logged in'
    }), Status.HTTP_200_OK


@APP.route('/api/logout', methods=['POST'])
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
    session.clear()
    return jsonify({
        'message': f'User: {user.email} is logged out'
    }), Status.HTTP_200_OK


@APP.route('/api/register', methods=['POST'])
@data_validator
def register():
    """
    POST methods for registration
    :return: Registered user or
     incorrect responses
    """

    data = request.get_json()
    email = data['email']
    password = data['password']

    user = DataBaseManager.get_user_by_email(email)
    if user:
        if user.confirmed:
            return jsonify({
                'message': f'email: {email} already exist'
            }), Status.HTTP_401_UNAUTHORIZED

    if not user:
        user = User.create(email, password)

    password = check_password_hash(pwhash=user.password, password=data['password'])

    if not password:
        return jsonify({
            'message': 'You entered incorrect password please reset your password'
        }), Status.HTTP_400_BAD_REQUEST

    token = generate_confirmation_token(user.email)

    confirm_url = url_for('index', _external=True) + 'confirm/' + token.decode('utf-8')
    html = f'Link: {confirm_url}'
    subject = "Please confirm your email"
    send_email(user.email, subject, html)

    return jsonify({
        'message': f'Please confirm registration via email'
    }), Status.HTTP_201_CREATED


@login_required
@APP.route('/api/confirm/<token>')
def confirm_email(token):
    """
    View that updates status of our user
     to confirmed via email
    :param token:
    :return: eather change status in bd to True
    or incorrect responses
    """
    email = confirm_token(token)

    if not email:
        return jsonify({
            'message': 'Link expired'
        }), Status.HTTP_400_BAD_REQUEST

    user = DataBaseManager.get_user_by_email(email)

    user.confirmed = True
    user.confirmed_date = DateTimeManager.get_current_time()
    DB.session.add(user)
    DB.session.commit()

    return jsonify({
        'token': token
        }), Status.HTTP_200_OK


@APP.route("/api/reset", methods=['POST'])
def reset_request():
    """
    POST method that sends password reset link
    to the email address that is registered
    in our system
    :return: eather link sent to email or no correct
    response
    """
    ttl = 60 * 60

    if 'user_id' in session:
        return jsonify({
            'message': 'Logged user cannot reset password'
        }), Status.HTTP_401_UNAUTHORIZED

    data = request.get_json()
    email = data['email']
    schema = UserSchema.reg_email

    if not re.match(schema, email):
        return jsonify({
            'message': 'Email is invalid'
            }), Status.HTTP_415_UNSUPPORTED_MEDIA_TYPE

    user = DataBaseManager.get_user_by_email(email)
    if not user:
        return jsonify({
            'message': f'Email {email} not found'
        }), Status.HTTP_404_NOT_FOUND

    token = generate_confirmation_token(user.email)
    subject = "Password reset requested"
    recover_url = url_for(
        'index', _external=True) + \
        'reset_password_confirm/' + \
        token.decode('utf-8')
    html = f'Reset Password link {recover_url}'
    send_email(user.email, subject, html)
    REDIS.set(token, True, ex=ttl)
    return jsonify({
        'message': f'reset password link sent to email {email}'
        }), Status.HTTP_201_CREATED


@APP.route('/api/password_reset/<token>', methods=['PUT', 'GET'])
def password_reset(token):
    """
    PUT view that updates password in our DB
    :param token:
    :return: updated password for user
    """
    if request.method == "GET":
        if not REDIS.get(token):
            return jsonify({
                'message': 'Token is invalid'
            }), Status.HTTP_400_BAD_REQUEST
        return Status.HTTP_200_OK

    if not REDIS.get(token):
        return jsonify({
            'message': 'Token is invalid'
            }), Status.HTTP_400_BAD_REQUEST

    email = confirm_token(token)

    if not email:
        return jsonify({
            'message': 'Link has been expired'
        }), Status.HTTP_400_BAD_REQUEST

    data = request.get_json()
    schema = UserSchema.reg_pass
    password = data['password']

    if not re.match(schema, password):
        return jsonify({
            'message': 'Password is invalid'
            }), Status.HTTP_400_BAD_REQUEST

    password = generate_password_hash(data['password'])

    user = DataBaseManager.get_user_by_email(email)
    user.password = password
    DB.session.add(user)
    DB.session.commit()
    REDIS.delete(token)
    return jsonify({
        'token': token
    }), Status.HTTP_200_OK
