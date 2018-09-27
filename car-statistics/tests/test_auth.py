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
