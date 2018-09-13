from flask import request, url_for
from app.services.token import generate_confirmation_token

import json
from app import app
from app.models.user import User
from app.services.email import send_email


@app.route("/api/reset", methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data['email']
    if email:
        user = User.query.filter(User.email == email).first()
        token = generate_confirmation_token(user.email)
        subject = "Password reset requested"
        recover_url = url_for('index', _external=True) + 'reset_password_confirm/' + token.decode('utf-8')

        html = f'Reset Password link {recover_url}'
        send_email(user.email, subject, html)
        return json.dumps({
            'message': f'reset password link sent to email {email}'
        }), 200
    else:
        return json.dumps({
            'message': f'User {email} not found'
        }), 404
