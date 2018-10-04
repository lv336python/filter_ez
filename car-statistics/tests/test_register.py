import mock
from .fake_data_for_registration import FakeUser


def register(client, email, password):
    return client.post('/api/register', json=dict(
        email=email,
        password=password
    ), follow_redirects=True)


def test_register_user_already_exist(client):
    user = FakeUser()
    with mock.patch("app.routers.register.User") as mock_query_filter:
        mock_query_filter.query.filter().first.return_value = user
        response_user_exist = register(client, 'vovapetryna1995@gmail.com', 'qwerty111')
        assert response_user_exist.status_code == 401


def test_register_bad_password(client):
    user = FakeUser()
    with mock.patch('app.routers.register.User') as mock_create_user:
        mock_create_user.query.filter().first.return_value = None
        mock_create_user.create.return_value = user
        with mock.patch('app.routers.register.check_password_hash') as mock_hash_password:
            mock_hash_password.return_value = False
            response = register(client, 'vovapetryna1995@gmail.com', 'qwerty111')
            assert response.status_code == 400


def test_success_register(client):
    user = FakeUser()
    with mock.patch('app.routers.register.User') as mock_create_user:
        mock_create_user.query.filter().first.return_value = None
        mock_create_user.create.return_value = user
        with mock.patch('app.routers.register.check_password_hash') as mock_hash_password:
            mock_hash_password.return_value = True
            with mock.patch('app.routers.register.send_email') as mock_token:
                mock_token.return_value = None
                response = register(client, 'vovapetryna1995@gmail.com', 'qwerty111')
                assert response.status_code == 201
