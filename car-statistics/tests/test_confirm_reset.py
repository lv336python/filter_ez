import mock

from .fake_data import FakeUser

def confirm_reset(client):
    """
    Fake logginout user
    :param client:
    :return: logout
    """

    return client.put('/api/password_reset/<token>', follow_redirects=True)


def test_confirm_reset_email(client):
    """
    Full login and logout process
    :param client:
    :return: 200 response
    """
    with mock.patch("app.routers.confirm_reset.confirm_token") as mock_confirm_token:
        mock_confirm_token.return_value = None
        rv = confirm_reset(client)
    assert rv._status_code == 200