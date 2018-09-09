from flask import request, redirect, flash
from werkzeug.security import generate_password_hash, check_password_hash

from app.models import User
from app import app
from app import db
import json
import re


@app.route('/register', methods=['POST'])
def register():
    """
    GET and POST methods for registration
    :return:
    """
    if request.method == 'POST':
        regemail = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        data = request.get_json()
        email = data['email'].strip()
        if not re.match(regemail, email):
            return json.dumps({'status': 401,
                               'message': 'email is`n correct'}), 401
        if not User.query.filter(User.email == email).first():
            password = generate_password_hash(data['password'])
            if email and password:

                new_user = User(email=email, password_plaintext=password)
                db.session.add(new_user)
                db.session.commit()
                flash('Thanks for registering!',
                      'success')  # if base template has looping through message flash displays
                res = new_user.to_dict()
                res.update({'token': 'supersecrettoken'})
                return json.dumps(res), 201
            else:
                return json.dumps({'status': 401,
                                   'message': 'Empty value'})
        else:
            flash('ERROR! Email ({}) already exists.'.format(email), 'error')
            return json.dumps({
                'status': 401,
                'message': f'email: {email} already exist'
            })
