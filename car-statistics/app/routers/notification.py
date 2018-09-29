from flask import session
from flask_socketio import join_room, leave_room
from app import socketio


@socketio.on('connect')
def on_connect():
    print('User connected')


@socketio.on('join_room')
def on_join(user_id):
    print(f'User joined room {user_id}')
    join_room(user_id)
    session['room_id'] = user_id


@socketio.on('disconnect')
def on_disconnect():
    leave_room(session['room_id'])
    print('Client disconnected')
