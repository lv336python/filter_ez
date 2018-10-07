'''
Module for reset_password view
'''
import mock
from .fake_data_for_registration import FakeSession, FakeUser



def reset_password(client, email):
    '''
    call reset_password view
    :param client:
    :param email: user email
    :return: user password
    '''
    return client.post('api/reset', json=dict(
        email=email,
    ), follow_redirects=True)


SESSION = FakeSession()


def mock_url_for_function():
    '''
    mocked function for url_for flask function
    :return:
    '''
    return "mock_url_for"


@mock.patch(target='app.routers.reset_password.session', new=SESSION.fake_session)
def test_reset_password_for_logged_user(client):
    '''
    check case when logged user try to reset password
    :param client:
    :return: check if response status code is equal to 401
    '''
    response = reset_password(client, "blabla@gmail.com")
    assert response.status_code == 401


@mock.patch(target='app.routers.reset_password.session', new=SESSION.fake_session_none)
def test_reset_password_for_invalid_email(client):
    '''
    check case when user enter invalid email
    :param client:
    :return: check if response status code is equal to 415
    '''
    with mock.patch('app.routers.reset_password.re.match') as mock_re_email:
        mock_re_email.return_value = False
        response = reset_password(client, "blabla@gmail.com")
        assert response.status_code == 415  # invalid media data


@mock.patch(target='app.routers.reset_password.session', new=SESSION.fake_session_none)
def test_reset_password_for_non_exists_user(client):
    '''
    Check case when user does not exist
    :param client:
    :return: check if response status code is equal to 404
    '''
    with mock.patch('app.routers.reset_password.User') as mock_create_user:
        with mock.patch('app.routers.reset_password.re.match') as mock_re_email:
            mock_re_email.return_value = True
            mock_create_user.query.filter().first.return_value = None
            response = reset_password(client, "blabla@gmail.com")
            assert response.status_code == 404  # user not found


@mock.patch(target='app.routers.reset_password.session', new=SESSION.fake_session_none)
def test_reset_password_for_valid_user(client):
    '''
    check case when user exist and email is valid
    :param client:
    :return: check if response status code is equal to 201
    '''
    user = FakeUser()
    with mock.patch('app.routers.reset_password.re.match') as mock_re_email:
        mock_re_email.return_value = True
        with mock.patch('app.routers.reset_password.User') as mock_create_user:
            mock_create_user.query.filter().first.return_value = user
            with mock.patch('app.routers.reset_password.url_for', new=user.mock_url_for):
                response = reset_password(client, "blabla@gmail.com")
                assert response.status_code == 201
