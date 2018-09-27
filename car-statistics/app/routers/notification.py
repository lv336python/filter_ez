from flask_socketio import join_room, leave_room
from flask import request, session
from app import socketio, clients


@socketio.on('connect')
def test_connect():
    clients[session['user_id']] = request.sid
    join_room(request.sid)
    print('User connected')


@socketio.on('disconnect')
def test_disconnect():
    clients.remove(session['user_id'])
    leave_room(request.sid)
    print('Client disconnected')
