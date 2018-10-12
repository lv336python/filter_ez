
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
    # DEBUG = False
    # TESTING = False
    # CSRF_ENABLED = True
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SECURITY_PASSWORD_SALT = 'my_precious_two'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DATABASE['POSTGRES_USER']}:" \
                              f"{DATABASE['POSTGRES_PASSWORD']}@" \
                              f"{DATABASE['HOST']}:{DATABASE['PORT']}/{DATABASE['DB_NAME']}"

    MIGRATION_DIR = os.path.join(BASEDIR, 'migrations')
    # mail settings
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

    # gmail authentication
    MAIL_USERNAME = MAIL['MAIL_USERNAME']
    MAIL_PASSWORD = MAIL['MAIL_PASSWORD']
    ADMIN_MAIL = MAIL['ADMIN_MAIL']

    # mail accounts
    MAIL_DEFAULT_SENDER = 'statisticcar@gmail.com'

    # logging parameters
    LOGGING_CONFIG_FILE = os.path.join(APPLICATION_ROOT, 'logging_conf.py')
    LOG_FILE_PATH = os.path.join(BASEDIR, 'logs/log.txt')

    # file storage
    DATA_FOLDER = 'usersdata'

    #temp files
    TEMP_FOLDER = os.path.join(BASEDIR, DATA_FOLDER, 'Temp files')
    UPLOAD_LIMIT = 50
    # uploads params
    UPLOAD_FOLDER = 'uploads'
    ALLOWED_EXTENSIONS = ('csv', 'xls', 'xlsx')

    #Celery configurations
    CELERY_RESULT_BACKEND = 'rpc://'
    CELERY_BROKER_URL = 'amqp://guest@localhost//'
    CELERY_ACCEPT_CONTENT = ['json', 'pickle']
    CELERY_ROUTES = {
        'app.services.mail_service.*': {'queue': 'email'}
    }
    SESSION_COOKIE_HTTPONLY = False
