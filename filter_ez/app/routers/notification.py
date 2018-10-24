"""
Routes for websocket connections
"""
from flask_socketio import join_room, close_room
from flask_login import current_user
from app import SOCKETIO, LOGGER


@SOCKETIO.on('connect')
def on_connect():
    """
    Invoked when client tries to establish connection. If this client is authenticated
    user, he is added to room with the name of his id.
    :return: None
    """
    if current_user.is_authenticated:
        LOGGER.info('%s connected', str(current_user))
        join_room(current_user.id)


@SOCKETIO.on('disconnect')
def on_disconnect():
    """
    Invoked when user disconnects and closes the room user was in.
    :return: None
    """
    close_room(current_user.id)
    LOGGER.info('%s disconnected', str(current_user))
