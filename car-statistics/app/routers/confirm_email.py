'''
Module for confirmation view
'''
import json

from app import app
from app import db
from app.services.token_service import confirm_token
from app.models import User

from flask import flash


@app.route('/api/confirm/<token>')
def confirm_email(token):
    """
    View that updates status of our user
     to confirmed via email
    :param token:
    :return: eather change status in bd to True
    or incorrect responses
    """
    try:
        email = confirm_token(token)
    except ValueError:
        flash('The confirmation link is invalid or has expired.', 'danger')
    user = User.query.filter(User.email == email).first()
    if user:
        if user.confirmed:
            flash('Account already confirmed. Please login.', 'success')
        else:
            user.confirmed = True
            db.session.add(user)
            db.session.commit()
            flash('You have confirmed your account. Thanks!', 'success')
        return json.dumps({'status': 200, 'token': token}), 200
    return json.dumps({'status': 404, 'message': 'user doesnt exist'}), 404
