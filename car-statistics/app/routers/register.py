'''
Module for register views
'''
import json

from flask import request, url_for

from app.models import User, UserSchema
from app import app
from app import db
from app.services.token_service import generate_confirmation_token
from app.services.mail_service import send_email

from app.services.validate_service import data_validator


@app.route('/api/register', methods=['POST'])
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
    if not password:
        return json.dumps({'status':'401','message': 'password must be filled!'}),401
    schema = UserSchema()

    user = User.query.filter(User.email == email).first()
    if user:
        if user.confirmed:
            return json.dumps({
                'message': f'email: {email} already exist'
            }), 401

    if not user:
        user = User.create(email, password)

    token = generate_confirmation_token(user.email)

    confirm_url = url_for('index', _external=True) + 'confirm/' + token.decode('utf-8')
    html = f'Link: {confirm_url}'
    subject = "Please confirm your email"
    send_email(user.email, subject, html)

    return json.dumps({
        'message': f'Please confirm registration and link sent to {user.email}'
    }), 201
