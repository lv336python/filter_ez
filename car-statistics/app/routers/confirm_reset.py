'''
Module for confirmation view
'''
import json
from flask import flash, request
from app import app
from app import db
from app.routers.registration.token import confirm_token
from app.models import User



@app.route('/api/password_reset/<token>')
def reset_with_token(token):
    try:
        email = confirm_token(token)
    except ValueError:
        flash('The confirmation link is invalid or has expired.', 'danger')
    data = request.get_json()
    password = 'blsoaoasgs'
    if password:
        user = User.query.filter(User.email == email).first()
        print(user)
        if user:
            user.password_plaintext = password
            db.session.add(user)
            db.session.commit()
            return json.dumps({'status': 200, 'token': token}), 200
    return json.dumps({'status': 404, 'message': 'user doesnt exist'}), 404


