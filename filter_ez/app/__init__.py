"""
Initialization of app, mail, manager, database objects
"""
import eventlet

from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
import redis

from app.config import Config
from app.celery_manage import create_celery
from app.logging_conf import make_logger
eventlet.monkey_patch()


APP = Flask(__name__)
APP.config.from_object(Config)

DB = SQLAlchemy(APP)
MAIL = Mail(APP)

LOGIN_MANAGER = LoginManager()
LOGIN_MANAGER.init_app(APP)

MIGRATE = Migrate(APP, DB, directory=APP.config['MIGRATION_DIR'])
MANAGER = Manager(APP)
MANAGER.add_command('DB', MigrateCommand)

CELERY = create_celery(APP)

REDIS = redis.Redis(host=APP.config['REDIS_URL'], port=APP.config['REDIS_PORT'], db=0)

LOGGER = make_logger(APP.config['LOG_FILE_PATH'])

SOCKETIO = SocketIO(APP, async_mode='eventlet', message_queue=APP.config['BROKER_URL'])

from .routers import (  # pylint: disable = C0413
    notification,
    auth,
    file_data,
    file_manage,
    filters,
    main,
    temp_link,
    user_data,
)
