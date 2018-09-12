from werkzeug.security import check_password_hash
from flask import request, session
import json
from app import app
from app.models.user import User


@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter(User.email==data['email']).first()
    if not user:
        return json.dumps({
            'message': 'Login or password not found'
        }), 400

    password = check_password_hash(pwhash=user.password_plaintext, password=data['password'])
    if not password:
        return json.dumps({
            'message': 'Login or password not found'
        }), 400

    session['user_id'] = user.id

    return json.dumps({
        'message': f'User: {data["email"]} is logged in'
    }), 200




@app.route('/api/logout', methods=['POST'])
def logout():
    if 'user_id' in  session:

        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            session.pop('user_id', None)
            return json.dumps({
                'message': f'User: {user.email} is logged out'
            }), 200

    return json.dumps({
        'message': 'bad request'
    }), 400