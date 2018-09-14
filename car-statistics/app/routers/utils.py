from app import app
from app.utils import fake_users
from flask import jsonify, make_response


@app.route('/utils/fakeusers/<number>')
def addusers(number):
    count = int(number)
    list_of_users = fake_users(count)
    print(list_of_users)
    return make_response(jsonify({'status': 'ok'}), 200)
