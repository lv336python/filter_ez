import mock
from .fake_data_for_registration import FakeUser


def confirm_email(client):
    return client.get('/api/confirm/<token>', follow_redirects=True)


def test_expired_toke_confirm(client):
    with mock.patch('app.routers.confirm_email.confirm_token') as mock_token:
        mock_token.return_value = None
        response = confirm_email(client)
        assert response.status_code == 400


def test_user_not_exist(client):
    with mock.patch('app.routers.confirm_email.confirm_token') as mock_token:
        with mock.patch("app.routers.register.User") as mock_query_filter:
            mock_token.return_value = "valid_user@gmail.com"
            mock_query_filter.query.filter().first.return_value = None
            response = confirm_email(client)
    assert response.status_code == 404


def test_valid_user(client):
    user = FakeUser()
    with mock.patch('app.routers.confirm_email.confirm_token') as mock_token:
        mock_token.return_value = "valid_user@gmail.com"
        with mock.patch("app.routers.confirm_email.User") as mock_query_filter:
            with mock.patch("app.routers.confirm_email.db.session") as mock_db:
                mock_db.add.return_value = 'admin12345'
                mock_query_filter.query.filter().first.return_value = user
                response = confirm_email(client)
    assert response.status_code == 200