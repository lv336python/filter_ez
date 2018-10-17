from flask_socketio import join_room, leave_room
from flask_login import current_user
from app import socketio


@socketio.on('connect')
def on_connect():
    print(f'{str(current_user)} connected')
    join_room(current_user.id)


@socketio.on('disconnect')
def on_disconnect():
    leave_room(current_user.id)
    print(f'{current_user} disconnected')
