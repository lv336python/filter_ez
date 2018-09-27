import os
import tempfile

import pytest

from app import app
from app.models import User



@pytest.fixture
def client():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    client = app.test_client()

    yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])


@pytest.fixture
def new_user():
    user = User('vova@gmail.com', 'qwerty1111')
    return user

# def login(client, email, password):
#     return client.post('/api/login', json=dict(
#         email=email,
#         password=password
#     ), follow_redirects=True)
#
#
# def logout(client):
#     return client.get('/logout', follow_redirects=True)
