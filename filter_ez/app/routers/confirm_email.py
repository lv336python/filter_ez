'''
Module for confirmation view
'''
import json
from datetime import datetime

from flask import flash

from app import app
from app import db
from app.services.token_service import confirm_token
from app.models import User
from app.helper.constant_status_codes import Status


@app.route('/api/confirm/<token>')
def confirm_email(token):
    """
    View that updates status of our user
     to confirmed via email
    :param token:
    :return: eather change status in bd to True
    or incorrect responses
    """
    email = confirm_token(token)

    if not email:
        return json.dumps({
            'message': 'Link has been expired'
        }), Status.HTTP_400_BAD_REQUEST
    user = User.query.filter(User.email == email).first()

    if user:
        if user.confirmed:
            flash('Account already confirmed. Please login.', 'success')
        else:
            user.confirmed = True
            user.confirmed_date = datetime.utcnow()
            db.session.add(user)# pylint: disable=E1101
            db.session.commit()# pylint: disable=E1101
            flash('You have confirmed your account. Thanks!', 'success')
        return json.dumps({
            'token': token
            }), Status.HTTP_200_OK

    return json.dumps({'message': 'user doesnt exist'}), Status.HTTP_404_NOT_FOUND
