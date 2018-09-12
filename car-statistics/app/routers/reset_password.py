from werkzeug.security import check_password_hash, generate_password_hash
from flask import request, session, url_for
from app.routers.registration.token import generate_confirmation_token

import json
from app import app, db
from app.models.user import User
from app.routers.registration.email import send_email



@app.route("/api/reset", methods=['PUT'])
def reset_password():
    data = request.get_json()
    email = data['email']
    # print(session['user_id'])
    # if session['user_id']:
    if email:
        user = User.query.filter(User.email == email).first()
        # user.password_plaintext = password
        # db.session.add(user)
        # db.session.commit()
        token = generate_confirmation_token(user.email)
        subject = "Password reset requested"
        recover_url = url_for(
            'reset_with_token',
            token=token,
            _external=True)
        html = f'Reset Password link {recover_url}'
        send_email(user.email, subject, html)
        return json.dumps({
            'status': 200,
            'message': 'password reset'
        }), 200
    else:
        return 'Incorrect'

