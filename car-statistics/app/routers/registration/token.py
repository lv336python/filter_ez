from itsdangerous import URLSafeTimedSerializer

from app import app


def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    print("Confirmation token",serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT']))
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])


def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    print('serializer ',serializer)
    try:
        email = serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email
