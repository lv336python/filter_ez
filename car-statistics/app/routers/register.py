from flask import request, flash, url_for
from werkzeug.security import generate_password_hash

import json
import re

from app.models import User
from app import app
from app import db
from app.routers.registration.token import generate_confirmation_token, confirm_token
from app.routers.registration.email import send_email



@app.route('/api/register', methods=['POST'])
def register():
    """
    POST methods for registration
    :return: Registered user
    """
    if request.method == 'POST':
        reg_email = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        data = request.get_json()
        print(data)
        email = data['email']
        if not re.match(reg_email, email):
            return json.dumps({
                'status': 401,
                'message': 'invalid email'
            }), 401
        if not User.query.filter(User.email == email).first():
            password = generate_password_hash(data['password'])
            if email and password:
                new_user = User(email=email, password_plaintext=password, confirmed=False)
                db.session.add(new_user)
                db.session.commit()

                token = generate_confirmation_token(new_user.email)
                confirm_url = url_for('index', _external=True) + 'confirm/' + token.decode('utf-8')
                html = f'Link: {confirm_url}'
                print(confirm_url)
                subject = "Please confirm your email"
                send_email(new_user.email, subject, html)

                flash('Thanks for registering!', 'success')#if base template has looping through message flash displays
                return json.dumps({
                    "status": 201,
                    'message': new_user.email
                }), 201
            else:
                return json.dumps({
                                   'status': 401,
                                   'message': 'empty value'
                                  }), 401
        else:
            flash('ERROR! Email ({}) already exists.'.format(email), 'error')
            return json.dumps({
                'status': 401,
                'message': f'email: {email} already exist'
            }), 401


