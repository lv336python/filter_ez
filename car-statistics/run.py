from app import app
'''
    The program entrance point
'''

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
