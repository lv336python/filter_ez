
"""
Configuration module for app, mail
"""
import os

try:
    from .local_settings import *
except EnvironmentError:
    pass

APPLICATION_ROOT = os.path.abspath(os.path.dirname(__file__))
BASEDIR = os.path.join(APPLICATION_ROOT, '..')


class Config:
    """
    Configuration class to configure app from object
    """
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SECURITY_PASSWORD_SALT = 'my_precious_two'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "postgresql://car_stats:carstatistics@postgres:5432/car_stats"

    MIGRATION_DIR = os.path.join(BASEDIR, 'migrations')
    # mail settings
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = MAIL['MAIL_USERNAME']
    MAIL_PASSWORD = MAIL['MAIL_PASSWORD']
    MAIL_DEFAULT_SENDER = 'statisticcar@gmail.com'

    ADMIN_MAIL = MAIL['ADMIN_MAIL']

    # logging parameters
    LOG_FILE_PATH = os.path.join(BASEDIR, 'logs/log.txt')

    # file storage
    DATA_FOLDER = 'usersdata'

    # uploads params
    UPLOAD_FOLDER = 'uploads'
    ALLOWED_EXTENSIONS = ('csv', 'xls', 'xlsx')

    #Celery configurations
    RESULT_BACKEND = 'rpc://'
    BROKER_URL = 'amqp://rabbitmq:rabbitmq@rabbitmq:5672/'

    CELERY_ACCEPT_CONTENT = ['json', 'pickle']
    CELERY_ROUTES = {
        'app.services.mail_service.*': {'queue': 'email'}
    }
    SESSION_COOKIE_HTTPONLY = False
