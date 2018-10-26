'''
Module for confirmation view
'''
import json

from flask import flash

from app import APP
from app import DB
from app.services.token_service import confirm_token
from app.models import User
from app.helper.constant_status_codes import Status
from app.helper.date_time_manager import DateTimeManager


@APP.route('/api/confirm/<token>')
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
            'message': 'Link expired'
        }), Status.HTTP_400_BAD_REQUEST
    user = User.query.filter(User.email == email).first()

    if user:
        if user.confirmed:
            flash('Account already confirmed. Please login.', 'success')
        else:
            user.confirmed = True
            user.confirmed_date = DateTimeManager.get_current_time()
            DB.session.add(user)
            DB.session.commit()

            flash('You have confirmed your account. Thanks!', 'success')
        return json.dumps({
            'token': token
            }), Status.HTTP_200_OK

    return json.dumps({'message': 'user doesnt exist'}), Status.HTTP_404_NOT_FOUND
