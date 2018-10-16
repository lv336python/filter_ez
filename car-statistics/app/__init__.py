'''
Initialization of app, mail, manager, database objects

'''
import eventlet

from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

from app.config import Config
from app.celery_manage import create_celery
from app.logging_conf import make_logger

eventlet.monkey_patch()


app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
mail = Mail(app)

login_manager = LoginManager()
login_manager.init_app(app)

migrate = Migrate(app, db, directory=app.config['MIGRATION_DIR'])
manager = Manager(app)
manager.add_command('db', MigrateCommand)

celery = create_celery(app)

logger = make_logger(app.config['LOG_FILE_PATH'])

socketio = SocketIO(app, async_mode='eventlet', message_queue=app.config['BROKER_URL'])

from .routers import (
    auth,
    confirm_email,
    confirm_reset,
    datasets,
    delete_file,
    file_data,
    file_data,
    file_download,
    file_upload,
    filter,
    main,
    notification,
    register,
    reset_password,
    user_data
)
