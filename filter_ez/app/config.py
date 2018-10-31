
"""
Configuration module for APP, MAIL
"""
import os

DATABASE = {
    'POSTGRES_USER': 'POSTGRES_USER',
    'POSTGRES_PASSWORD': 'POSTGRES_PASSWORD',
    'HOST': 'HOST',
    'PORT': "PORT",
    'DB_NAME': 'DB_NAME'
}

MAIL = {
    'MAIL_USERNAME': 'MAIL_USERNAME',
    'MAIL_PASSWORD': 'MAIL_PASSWORD',
    'ADMIN_MAIL': 'ADMIN_MAIL'
}

try:
    from .local_settings import * # pylint: disable=W0401, E0401
except EnvironmentError:
    pass

BASEDIR = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))

IS_IN_DOCKER = os.environ.get('DOCKER', False)

class Config:# pylint: disable=R0903
    """
    Configuration class to configure APP from object
    """
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SECURITY_PASSWORD_SALT = 'my_precious_two'

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    if IS_IN_DOCKER:
        SQLALCHEMY_DATABASE_URI = "postgresql://filter_ez:filter_ez@postgres:5432/filter_ez"
    else:
        SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE['POSTGRES_USER']}:" \
                                  f"{DATABASE['POSTGRES_PASSWORD']}@" \
                                  f"{DATABASE['HOST']}:{DATABASE['PORT']}/{DATABASE['DB_NAME']}"

    MIGRATION_DIR = os.path.join(BASEDIR, 'migrations')
    # MAIL settings
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

    # user data
    USER_DATA_FOLDER = os.path.join(BASEDIR, 'usersdata')
    UPLOAD_FOLDER = os.path.join(USER_DATA_FOLDER, 'uploads')

    #temp files
    TEMP_FOLDER = os.path.join(USER_DATA_FOLDER, 'temp')
    UPLOAD_LIMIT = 40000  # in kB

    ALLOWED_EXTENSIONS = ('csv', 'xls', 'xlsx')

    #Celery configurations
    RESULT_BACKEND = 'rpc://'

    if IS_IN_DOCKER:
        BROKER_URL = 'amqp://rabbitmq:rabbitmq@rabbitmq:5672/'
        REDIS_URL = 'amqp://redis:password@localhost:6379/0'
    else:
        BROKER_URL = 'amqp://guest@localhost//'

    CELERY_ACCEPT_CONTENT = ['json', 'pickle']
    CELERY_ROUTES = {
        'app.services.mail_service.*': {'queue': 'email'}
    }
    SESSION_COOKIE_HTTPONLY = False
