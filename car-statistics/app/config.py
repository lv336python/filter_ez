import os

try:
    from .local_settings import *
except:
    pass

BASEDIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    # DEBUG = False
    # TESTING = False
    # CSRF_ENABLED = True
    SECRET_KEY = 'gnesormvd;lfmgjiowapgneri[foawevnrgo'
    SECURITY_PASSWORD_SALT = 'adminadmin12344321911'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE['POSTGRES_USER']}:{DATABASE['POSTGRES_PASSWORD']}@" \
                              f"{DATABASE['HOST']}:{DATABASE['PORT']}/{DATABASE['DB_NAME']}"

    # mail settings
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

    # gmail authentication
    MAIL_USERNAME = MAIL['MAIL_USER']
    MAIL_PASSWORD = MAIL['MAIL_PASSWORD']

    # mail accounts
    MAIL_DEFAULT_SENDER = 'from@example.com' ## does not work!??