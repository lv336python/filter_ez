from flask_socketio import join_room, leave_room
from flask import session
from app import socketio


@socketio.on('connect')
def test_connect():
    print(session['user_id'])
    join_room(session['user_id'])
    print('User connected')


@socketio.on('disconnect')
def test_disconnect():
    leave_room(session['user_id'])
    print('Client disconnected')
