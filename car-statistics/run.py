from app import app, socketio
'''
    The program entrance point
'''

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
