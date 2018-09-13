from app.services.token import generate_confirmation_token
from app.services.email import send_email
from app import app
from app.models.user import User

from flask import request, url_for

import json



@app.route("/api/reset", methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data['email']
    if email:
        user = User.query.filter(User.email == email).first()
        token = generate_confirmation_token(user.email)
        subject = "Password reset requested"
        recover_url = url_for(
            'reset_with_token',
            token=token,
            _external=True)
        html = f'Reset Password link {recover_url}'
        send_email(user.email, subject, html)
        return json.dumps({
            'message': f'reset password link sent to email {email}'
        }), 200
    else:
        return json.dumps({
            'message': f'User {email} not found'
        }), 404

