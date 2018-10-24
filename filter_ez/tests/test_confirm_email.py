'''
Module for confirm_email view testing
'''
import mock
from .fake_data_for_registration import FakeUser


def confirm_email(client):
    '''
    cFunction that call confirm_email view
    :param client:
    :return: response from confirm_email view
    '''
    return client.get('/api/confirm/<token>', follow_redirects=True)


def test_expired_toke_confirm(client):
    '''
    check case when token is expired
    :param client:
    :return: check if response status code is equal to 400
    '''
    with mock.patch('APP.routers.confirm_email.confirm_token') as mock_token:
        mock_token.return_value = None
        response = confirm_email(client)
        assert response.status_code == 400


def test_user_not_exist(client):
    '''
    check case when user is not exist
    :param client:
    :return: check if response status code is equal to 404
    '''
    with mock.patch('APP.routers.confirm_email.confirm_token') as mock_token:
        with mock.patch("APP.routers.register.User") as mock_query_filter:
            mock_token.return_value = "valid_user@gmail.com"
            mock_query_filter.query.filter().first.return_value = None
            response = confirm_email(client)
    assert response.status_code == 404


def test_valid_user(client):
    '''
    case when user is valid
    :param client:
    :return: check if response status code is equal to 200
    '''
    user = FakeUser()
    with mock.patch('APP.routers.confirm_email.confirm_token') as mock_token:
        mock_token.return_value = "valid_user@gmail.com"
        with mock.patch("APP.routers.confirm_email.User") as mock_query_filter:
            with mock.patch("APP.routers.confirm_email.DB.session") as mock_db:
                mock_db.add.return_value = 'admin12345'
                mock_query_filter.query.filter().first.return_value = user
                response = confirm_email(client)
    assert response.status_code == 200
