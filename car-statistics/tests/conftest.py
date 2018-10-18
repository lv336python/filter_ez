"""
Configuration for pytests
"""
import os
import tempfile

import pytest

from app import app

from app.models import User

@pytest.fixture
def client():
    '''
    Our fake client
    :return:
    '''
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    client = app.test_client()

    yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])

@pytest.fixture
def new_user():
    """
    Test for model User
    :return: user
    """
    user = User('vova@gmail.com', 'qwerty1111')
    return user
