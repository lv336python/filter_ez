from flask_socketio import join_room, leave_room
from flask_login import current_user
from app import socketio


@socketio.on('connect')
def on_connect():
    print(f'{str(current_user)} connected')


@socketio.on('join_room')
def on_join():
    print(f'User joined room {current_user}')
    join_room(current_user.id)


@socketio.on('disconnect')
def on_disconnect():
    leave_room(current_user.id)
    print(f'{current_user} disconnected')
