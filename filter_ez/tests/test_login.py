'''
Module for login view testing
'''

import mock
from werkzeug.security import check_password_hash

from .fake_data import FakeUser# pylint: disable=E0402


def login(client, email, password):
    """
    Fake loggining function
    :param client:
    :param email:
    :param password:
    :return: logged in fake user
    """
    return client.post('/api/login', json=dict(
        email=email,
        password=password
    ), follow_redirects=True)


def test_login_not_user(client):
    """
    Test checks what view return if no user
    :param client:
    :return: 400 response if no user
    """
    with mock.patch("APP.routers.auth.User") as mock_get_user:
        mock_get_user.query.filter().first.return_value = None
        response = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert response.status_code == 404


def test_login_not_user_confirmed(client):
    """
    Test checks what view return if no user confirmed
    :param client:
    :return: 400 response if user no confirmed
    """
    user = FakeUser()
    user.confirmed = False

    with mock.patch("APP.routers.auth.User") as mock_get_user:
        mock_get_user.query.filter().first.return_value = user
        response = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert response.status_code == 400


def test_login_not_password(client):
    """
    Test checks correct password
    :param client:
    :return: 400 if password from json and user incorrect
    """
    user = FakeUser()

    with mock.patch("APP.routers.auth.request") as mock_get_json:
        mock_get_json.get_json.return_value = {'email': user.email, 'password': 'admin123456'}
        with mock.patch("APP.routers.auth.User") as mock_get_user:
            mock_get_user.query.filter().first.return_value = FakeUser()
            response = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert response.status_code == 400


def test_login(client):
    """
    test logins fake user
    :param client:
    :return: 200 response if user is logged in
    """
    user = FakeUser
    with mock.patch("APP.routers.auth.request") as mock_get_json:
        mock_get_json.get_json.return_value = {'email': user.email, 'password': 'admin1234'}
        with mock.patch("APP.routers.auth.User") as mock_get_user:
            mock_get_user.query.filter().first.return_value = FakeUser()
            response = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert response.status_code == 200

def test_new_user(new_user):
    """
    Test for model user
    :param new_user:
    :return: response in case correct user
    """
    password = check_password_hash(pwhash=new_user.password, password='qwerty1111')
    assert new_user.email == 'vova@gmail.com'
    assert password is True
