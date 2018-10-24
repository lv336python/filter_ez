'''
Module for register view testing
'''
import mock
from .fake_data_for_registration import FakeUser


def register(client, email, password):
    '''
    Function that call registration view
    :param client:
    :param email: user email
    :param password:  user password
    :return: response message nad code
    '''
    return client.post('/api/register', json=dict(
        email=email,
        password=password
    ), follow_redirects=True)


def test_register_user_already_exist(client):
    '''
    Testing register user who is already exist.
    :param client:
    :return:
    '''
    user = FakeUser()
    with mock.patch("APP.routers.register.User") as mock_query_filter:
        mock_query_filter.query.filter().first.return_value = user
        response_user_exist = register(client, 'vovapetryna1995@gmail.com', 'qwerty111')
        assert response_user_exist.status_code == 401


def test_register_bad_password(client):
    '''
    Test case when decode password is bad
    :param client:
    :return: check if response status code is equal to 400
    '''
    user = FakeUser()
    with mock.patch('APP.routers.register.User') as mock_create_user:
        mock_create_user.query.filter().first.return_value = None
        mock_create_user.create.return_value = user
        with mock.patch('APP.routers.register.check_password_hash') as mock_hash_password:
            mock_hash_password.return_value = False
            response = register(client, 'vovapetryna1995@gmail.com', 'qwerty111')
            assert response.status_code == 400


def test_success_register(client):
    '''
    Test successful registering
    :param client:
    :return:check if response status code is equal to 201
    '''
    user = FakeUser()
    with mock.patch('APP.routers.register.User') as mock_create_user:
        mock_create_user.query.filter().first.return_value = None
        mock_create_user.create.return_value = user
        with mock.patch('APP.routers.register.check_password_hash') as mock_hash_password:
            mock_hash_password.return_value = True
            with mock.patch('APP.routers.register.send_email') as mock_token:
                mock_token.return_value = None
                response = register(client, 'vovapetryna1995@gmail.com', 'qwerty111')
                assert response.status_code == 201
