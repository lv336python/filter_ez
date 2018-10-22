'''
Module for confirm_reset (reset password) view
'''
import mock

from .fake_data import FakeUser# pylint: disable=E0402

def confirm_reset(client):
    """
    Fake logginout user
    :param client:
    :return: logout
    """

    return client.put('/api/password_reset/<token>', follow_redirects=True)


def test_confirm_reset_email(client):
    """
    Test checks response in case email expired
    :param client:
    :return: 400 response
    """
    with mock.patch("app.routers.confirm_reset.confirm_token") as mock_confirm_token:
        mock_confirm_token.return_value = None
        response = confirm_reset(client)
    assert response.status_code == 400



def test_confirm_reset_email_password(client):
    """
    Test checks valid email entering
    :param client:
    :return: 400 response
    """
    with mock.patch("app.routers.confirm_reset.confirm_token") as mock_confirm_token:
        mock_confirm_token.return_value = FakeUser.email
        with mock.patch("app.routers.confirm_reset.request") as mock_get_json:
            mock_get_json.get_json.return_value = {'password': 'admin1234@'}
            response = confirm_reset(client)

    assert response.status_code == 400

def test_confirm_reset_email_user_not_found(client):
    """
    Test checks if user not found
    :param client:
    :return: 404 response
    """
    with mock.patch("app.routers.confirm_reset.confirm_token") as mock_confirm_token:
        mock_confirm_token.return_value = FakeUser.email
        with mock.patch("app.routers.confirm_reset.request") as mock_get_json:
            mock_get_json.get_json.return_value = {'password': 'admin1234'}
            with mock.patch("app.routers.confirm_reset.User") as mock_get_user:
                mock_get_user.query.filter().first.return_value = None
                response = confirm_reset(client)

    assert response.status_code == 404

def test_confirm_reset_email_user_found(client):
    """
    Test checks if user found assign new password
    :param client:
    :return: 404 response
    """
    with mock.patch("app.routers.confirm_reset.confirm_token") as mock_confirm_token:
        mock_confirm_token.return_value = FakeUser.email
        with mock.patch("app.routers.confirm_reset.request") as mock_get_json:
            mock_get_json.get_json.return_value = {'password': 'admin12345'}
            with mock.patch("app.routers.confirm_reset.User") as mock_get_user:
                mock_get_user.query.filter().first.return_value = FakeUser()
                with mock.patch("app.routers.confirm_reset.db.session.add") as mock_db:
                    mock_db.return_value = 'admin12345'
                    response = confirm_reset(client)

    assert response.status_code == 200
