from app import app
from app import db
from app.routers.registration.token import confirm_token
from app.models import User


import json
from flask import flash


@app.route('/confirm/<token>')
def confirm_email(token):
    try:
        email = confirm_token(token)
    except:
        flash('The confirmation link is invalid or has expired.', 'danger')
    user = User.query.filter(User.email==email).first()
    if user:
        if user.confirmed:
            flash('Account already confirmed. Please login.', 'success')
        else:
            user.confirmed = True
            db.session.add(user)
            db.session.commit()
            flash('You have confirmed your account. Thanks!', 'success')
        return json.dumps({
            'status': 200,
            'token': token
        })
    else:
        return json.dumps({
            'status': 404,
            'message': 'user doesnt exist'
        })
