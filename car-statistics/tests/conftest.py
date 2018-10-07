import os
import tempfile

import pytest

from app import app





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
