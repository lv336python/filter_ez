'''
Module for register views
'''
import json

from flask import request, url_for

from werkzeug.security import generate_password_hash

from app.models import User, UserSchema
from app import app
from app import db
from app.services.token_service import generate_confirmation_token
from app.services.mail_service import send_email


@app.route('/api/register', methods=['POST'])
def register():
    """
    POST methods for registration
    :return: Registered user or
     incorrect responses
    """
    if request.method == 'POST':

        data = request.get_json()
        email = data['email']
        schema = UserSchema()

        if not User.query.filter(User.email == email).first():
            password = generate_password_hash(data['password'])
            if email and password:
                new_user = User(email=email, password=password, confirmed=False)
                valid_data_error = schema.dump(new_user).errors

                if not valid_data_error:

                    db.session.add(new_user)# pylint: disable=E1101
                    db.session.commit()# pylint: disable=E1101

                    token = generate_confirmation_token(new_user.email)
                    confirm_url = url_for('index', _external=True) + \
                                  'confirm/' + \
                                  token.decode('utf-8')
                    html = f'Link: {confirm_url}'
                    subject = "Please confirm your email"
                    send_email(new_user.email, subject, html)

                    return json.dumps({
                        'message': new_user.email
                        }), 201

            return json.dumps({
                'message': 'empty value'
                }), 401

        return json.dumps({
           'message': f'email: {email} already exist'
            }), 401
