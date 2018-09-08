from flask import request, redirect, flash,url_for
from app.routers.registration.token import generate_confirmation_token, confirm_token
from app.models import User
from app import app
from app import db
import json



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
    return json.dumps({'message': 'succesfull'})
