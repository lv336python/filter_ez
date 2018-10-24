import mock

from .fake_data import FakeUser

'''
Module for logout view testing
'''


def login(client, email, password):
    """
    Fake loggining user
    :param client:
    :param email:
    :param password:
    :return: logged in fake user
    """
    return client.post('/api/login', json=dict(
        email=email,
        password=password
    ), follow_redirects=True)


def logout(client):
    """
    Fake logginout user
    :param client:
    :return: logout
    """
    return client.post('/api/logout', follow_redirects=True)


def test_login_required(client):
    """
    Full login and logout process
    :param client:
    :return: 200 response
    """
    user = FakeUser()
    with mock.patch("APP.routers.auth.request") as mock_get_json:
        mock_get_json.get_json.return_value = {'email': user.email, 'password': 'admin1234'}
        with mock.patch("APP.routers.auth.User") as mock_get_user:
            mock_get_user.query.filter().first.return_value = FakeUser()
            response = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')
            response = logout(client)

    assert response.status_code == 200
