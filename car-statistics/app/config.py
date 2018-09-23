
"""
Configuration module for app, mail
"""
import os

try:
    from .local_settings import *
except EnvironmentError:
    pass

BASEDIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    """
    Configuration class to configure app from object
    """
    # DEBUG = False
    # TESTING = False
    # CSRF_ENABLED = True
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SECURITY_PASSWORD_SALT = 'my_precious_two'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE['POSTGRES_USER']}:" \
                              f"{DATABASE['POSTGRES_PASSWORD']}@" \
                              f"{DATABASE['HOST']}:{DATABASE['PORT']}/{DATABASE['DB_NAME']}"
    # mail settings
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

    # gmail authentication
    MAIL_USERNAME = MAIL['MAIL_USERNAME']
    MAIL_PASSWORD = MAIL['MAIL_PASSWORD']

    # mail accounts
    MAIL_DEFAULT_SENDER = 'statisticcar@gmail.com'

    # uploads params
    UPLOAD_FOLDER = 'uploads_temp'
    ALLOWED_EXTENSIONS = ('csv', 'xls', 'xlsx')

    #Celery configurations
    CELERY_RESULT_BACKEND = 'rpc://'
    CELERY_BROKER_URL = 'amqp://guest@localhost//'
    CELERY_ACCEPT_CONTENT = ['json', 'pickle']
    CELERY_ROUTES = {
        'app.services.mail_service.*': {'queue': 'email'}
    }
