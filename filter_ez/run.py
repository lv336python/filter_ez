"""
    The program entrance point
"""
from app import APP, SOCKETIO


if __name__ == "__main__":
    SOCKETIO.run(APP, host="0.0.0.0", port=8000, debug=True)
