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

from app.services.register_service import register_validator


@app.route('/api/register', methods=['POST'])
@register_validator
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

    if not User.query.filter(User.email == email).first():
        user = schema.load({'email': email, 'password': password}).data

        db.session.add(user)  # pylint: disable=E1101
        db.session.commit()  # pylint: disable=E1101

        token = generate_confirmation_token(user.email)

        confirm_url = url_for('index', _external=True) + \
                      'confirm/' + \
                      token.decode('utf-8')
        html = f'Link: {confirm_url}'
        subject = "Please confirm your email"
        send_email(user.email, subject, html)

        return json.dumps({
            'message': f'New user: {user.email}'
        }), 201

    user = User.query.filter(User.email == email).first()
    if not user.confirmed:
        token = generate_confirmation_token(user.email)

        confirm_url = url_for('index', _external=True) + \
                      'confirm/' + \
                      token.decode('utf-8')
        html = f'Link: {confirm_url}'
        subject = "Please confirm your email"
        send_email(user.email, subject, html)
        return json.dumps({
            'message': f'Confirmation link has been sent to email {user.email}'
        })
    return json.dumps({
        'message': f'email {email} already exist'
    }), 401
