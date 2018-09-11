from app import app
from app import db
from app.routers.registration.token import generate_confirmation_token, confirm_token

import json
from flask import flash, render_template

from app.models import User

@app.route('/confirm/<token>')
def confirm_email(token):
    try:
        email = confirm_token(token)
        print(email)
    except:
        flash('The confirmation link is invalid or has expired.', 'danger')
    user = User.query.filter_by(email=email).first_or_404()
    if user.confirmed:
        flash('Account already confirmed. Please login.', 'success')
    else:
        user.confirmed = True
        db.session.add(user)
        db.session.commit()
        flash('You have confirmed your account. Thanks!', 'success')
    return render_template('index.html')