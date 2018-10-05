import mock

from .fake_data import FakeUser


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



def test_login_required_unautorized(client):
    """
    Test checks logn_required decorator
    :param client:
    :return: 401 response due to unautorised user
    """
    rv = logout(client)
    assert rv._status_code == 401



def test_login_required_with_bd(client):
    """
    simple login logout tests with bd
    :param client:
    :return: response 200
    """
    rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty1111')
    rv = logout(client)
    assert rv._status_code == 200



def test_login_required(client):
    """
    Full login and logout process
    :param client:
    :return: 200 response
    """
    user = FakeUser()

    with mock.patch("app.routers.auth.request") as mock_get_json:
        mock_get_json.get_json.return_value = {'email': user.email, 'password': 'admin1234'}
        with mock.patch("app.routers.auth.User") as mock_get_user:
            mock_get_user.query.filter().first.return_value = FakeUser()
            rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')
            rv = logout(client)

    assert rv._status_code == 200
