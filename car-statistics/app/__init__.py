'''
Initialization of app, mail, manager, database objects

'''

from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from app.config import Config
from app.celery_manage import create_celery

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
mail = Mail(app)

login_manager = LoginManager()
login_manager.init_app(app)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

celery = create_celery(app)


from .routers import (
    test,
    register,
    confirm_email,
    auth,
    reset_password,
    confirm_reset,
    file_upload
)

