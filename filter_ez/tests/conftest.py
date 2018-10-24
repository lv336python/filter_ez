"""
Configuration for pytests
"""
import os
import tempfile

import pytest

from app import APP

from app.models import User

@pytest.fixture
def client():
    '''
    Our fake client
    :return:
    '''
    db_fd, APP.config['DATABASE'] = tempfile.mkstemp()
    APP.config['TESTING'] = True
    client = APP.test_client()

    yield client

    os.close(db_fd)
    os.unlink(APP.config['DATABASE'])

@pytest.fixture
def new_user():
    """
    Test for model User
    :return: user
    """
    user = User('vova@gmail.com', 'qwerty1111')
    return user
