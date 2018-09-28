def test_home_page(client):
    """Start with a blank database."""

    rv = client.get('localhost:800/login')
    assert rv._status_code == 200


def register(client, email, password):
    return client.post('/api/register', json=dict(
        email=email,
        password=password
    ), follow_redirects=True)


def login(client, email, password):
    return client.post('/api/login', json=dict(
        email=email,
        password=password
    ), follow_redirects=True)


def logout(client):
    return client.get('/api/logout', follow_redirects=True)




def test_register(client):
    rv = register(client, 'vovapetryna1995@gmail.com', 'qwerty111')
    assert rv._status_code == 401

    rv = login(client, 'vovapetryna1995@gmail.com', 'qwerty111')
    assert rv.status_code == 200

    rv = logout(client)
    assert rv.status_code == 200

    rv = logout(client)
    assert rv.status_code == 200
