import os
import tempfile

import pytest

from app import app



@pytest.fixture
def client():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    client = app.test_client()

    yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])



import pytest
from app.models import User

@pytest.fixture
def new_user():
    user = User('vova@gmail.com', 'qwerty1111')
    return user
