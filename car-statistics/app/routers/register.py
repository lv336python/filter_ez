from flask import request, redirect, flash

from sqlalchemy.exc import IntegrityError

from app.models import User
from app import app
from app import db


@app.route('/register', methods=['GET', 'POST'])
def register():
    """
    GET and POST methods for registration
    :return:
    """
    if request.method == 'POST':
        try:
            email = request.form['email']
            password = request.form['password']
            new_user = User(email=email, password_plaintext=password)
            new_user.authenticated = True
            db.session.add(new_user)
            db.session.commit()
            flash('Thanks for registering!', 'success')#if base template has looping through message flash displays
            return redirect('/')
        except IntegrityError:
            db.session.rollback()
            flash('ERROR! Email ({}) already exists.'.format(email), 'error')
    return '<h1>Registration form</h1>'
