from werkzeug.security import check_password_hash, generate_password_hash
from flask import request, session
import json
from app import app
from app.models.user import User


@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter(User.email==data['email']).first()
    password = check_password_hash(pwhash=user.password_plaintext, password=data['password'])
    if user and password:
        session['user_id'] = user.id
        if session['user_id']:
            return json.dumps({
                'status': 200,
                'message': f'User: {data["email"]} is logged in'
            }), 200
        else:
            return json.dumps({
                'status': 400,
                'message': 'bad request'
            }), 400
    else:
        return json.dumps({
            'status': 401,
            'message': 'login failed'
        }), 401



@app.route('/api/logout')
def logout():
    try:
        if session:
            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                session.pop('user_id', None)
                return json.dumps({
                    'status': 200,
                    'message': f'User: {user.email} is logged out'
                }), 200
    except KeyError:
        return json.dumps({
            'status': 400,
            'message': 'bad request'
        }), 400