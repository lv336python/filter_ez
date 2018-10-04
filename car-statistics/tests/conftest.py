import json
import os
import tempfile

import pytest

from app import app


@pytest.fixture
def client():
    db_fd, app.config['DATABASE_FAKE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    client = app.test_client()

    yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE_FAKE'])

#
# def login(client, email, password):
#     return client.post('/api/login', json=dict(
#         email=email,
#         password=password
#     ), follow_redirects=True)
#
#
# def logout(client):
#     return client.get('/logout', follow_redirects=True)
#
#
from app.models import User


