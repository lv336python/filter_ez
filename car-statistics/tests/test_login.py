import mock

from .fake_data import FakeUser, FakeUser1, SESSION, NO_SESSION


def test_home_page(client):
    """Start with a blank database."""

    rv = client.get('localhost:800/login')
    assert rv._status_code == 200



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


@mock.patch(target='app.routers.auth.data_validator', new=True)
def test_user_id(client):
    """
    Test that checks
    whether user_id in fake session
    :param client:
    :return: 401 http status if session
    """
    rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')
    assert rv._status_code == 401


@mock.patch(target='app.routers.auth.session', new=SESSION)
def test_user_id(client):
    """
    Test that checks
    whether user_id in fake session
    :param client:
    :return: 401 http status if session
    """
    rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')
    assert rv._status_code == 401



def test_login_not_user(client):
    """
    Test checks what view return if no user
    :param client:
    :return: 400 response if no user
    """
    with mock.patch("app.routers.auth.User") as mock_get_user:
        mock_get_user.query.filter().first.return_value = None
        rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert rv.status_code == 404


def test_login_not_user_confirmed(client):
    """
    Test checks what view return if no user confirmed
    :param client:
    :return: 400 response if user no confirmed
    """
    user = FakeUser1()

    with mock.patch("app.routers.auth.User") as mock_get_user:
        mock_get_user.query.filter().first.return_value = user
        rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert rv._status_code == 400



def test_login_not_password(client):
    """
    Test checks correct password
    :param client:
    :return: 400 if password from json and user incorrect
    """
    user = FakeUser()

    with mock.patch("app.routers.auth.request") as mock_get_json:
        mock_get_json.get_json.return_value = {'email': user.email, 'password': 'admin123456'}
        with mock.patch("app.routers.auth.User") as mock_get_user:
            mock_get_user.query.filter().first.return_value = FakeUser()
            rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert rv._status_code == 400




def test_login(client):
    """
    test logins fake user
    :param client:
    :return: 200 response if user is logged in
    """
    user = FakeUser

    with mock.patch("app.routers.auth.request") as mock_get_json:
        mock_get_json.get_json.return_value = {'email': user.email, 'password': 'admin1234'}
        with mock.patch("app.routers.auth.User") as mock_get_user:
            mock_get_user.query.filter().first.return_value = FakeUser()
            rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')

    assert rv._status_code == 200
