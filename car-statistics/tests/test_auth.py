from werkzeug.security import check_password_hash



def test_new_user(new_user):
    password = check_password_hash(pwhash=new_user.password, password='qwerty1111')
    assert new_user.email == 'vova@gmail.com'
    assert password == True

def test_method_not_allowed(client):

    response_login = client.post('/login')
    response_logout = client.post('/logout')

    assert response_login.status_code == 405
    assert response_logout.status_code == 405

#Yuriy Dudar
# class I:
#     @staticmethod
#     def first():
#         return {}
#
#
# class Mquery:
#     @staticmethod
#     def filter(*arg, **q):
#         return I()
#
#
# class MUser:
#     query = Mquery
#
#
# MUser.query.filter(dsfsd=1).first()
#
# from unittest import mock
#
#
def register(client, email, password):
    return client.post('/api/register', json=dict(
        email=email,
        password=password
    ), follow_redirects=True)


#
#
# @mock.patch('app.models.user.User', MUser)
# def test_register(client):
#     rv = register(client, 'vovapetffryfrna1995@gmail.com', 'qwerty1111')
#
#     assert rv.status_code == 201
# def test_register(client):
#     with patch("app.models.user.User.create") as perm_mock:
#         perm_mock.return_value = User('vovap@gmail.com', 'qwerty1111')
#
#         rv = register(client, 'vovapetffryfrna1995@gmail.com', 'qwerty1111')
#         print(rv.status_code)
#         assert rv.status_code == 202
def reset_password(client, email):
    return client.post('/api/reset', json=dict(
        email=email
    ), follow_redirects=True)


def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200


def test_sign_up(client):
    response = register(client, "dudaryoufgrko@gmail.com", "admin1234")
    assert response.status_code == 201


def test_reset_password(client):
    response = reset_password(client, "dudaryourko@gmail.com")
    assert response.status_code == 201
