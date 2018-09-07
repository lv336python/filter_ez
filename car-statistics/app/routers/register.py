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
        email = request.form['email'].strip()
        if not re.match(regemail, email):
            return json.dumps({'status': 401,
                               'message': 'email is`n correct'})
        if not User.query.filter(User.email == email).first():
            password = generate_password_hash(request.form['password'])
            if email and password:

                new_user = User(email=email, password_plaintext=password)
                db.session.add(new_user)
                db.session.commit()
                flash('Thanks for registering!',
                      'success')  # if base template has looping through message flash displays
                return redirect('/')
            else:
                return json.dumps({'status': 401,
                                   'message': 'Empty value'})
        else:
            flash('ERROR! Email ({}) already exists.'.format(email), 'error')
            return json.dumps({
                'status': 401,
                'message': f'email: {email} already exist'
            })
