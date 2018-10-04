import mock
from .fake_data_for_registration import FakeSession, FakeUser



def reset_password(client, email):
    return client.post('api/reset', json=dict(
        email=email,
    ), follow_redirects=True)


session = FakeSession()


def mock_url_for_function(*args, **kwargs):
    return "mock_url_for"


@mock.patch(target='app.routers.reset_password.session', new=session.fake_session)
def test_reset_password_for_logged_user(client):
    response = reset_password(client, "blabla@gmail.com")
    assert response.status_code == 401


@mock.patch(target='app.routers.reset_password.session', new=session.fake_session_none)
def test_reset_password_for_invalid_email(client):
    with mock.patch('app.routers.reset_password.re.match') as mock_re_email:
        mock_re_email.return_value = False
        response = reset_password(client, "blabla@gmail.com")
        assert response.status_code == 415  # invalid media data


@mock.patch(target='app.routers.reset_password.session', new=session.fake_session_none)
def test_reset_password_for_non_exists_user(client):
    with mock.patch('app.routers.reset_password.User') as mock_create_user:
        with mock.patch('app.routers.reset_password.re.match') as mock_re_email:
            mock_re_email.return_value = True
            mock_create_user.query.filter().first.return_value = None
            response = reset_password(client, "blabla@gmail.com")
            assert response.status_code == 404  # user not found


@mock.patch(target='app.routers.reset_password.session', new=session.fake_session_none)
def test_reset_password_for_valid_user(client):
    user = FakeUser()
    with mock.patch('app.routers.reset_password.re.match') as mock_re_email:
        mock_re_email.return_value = True
        with mock.patch('app.routers.reset_password.User') as mock_create_user:
            mock_create_user.query.filter().first.return_value = user
            with mock.patch('app.routers.reset_password.url_for', new=user.mock_url_for):
                response = reset_password(client, "blabla@gmail.com")
                assert response.status_code == 201
