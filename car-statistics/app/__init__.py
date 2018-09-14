'''
Initialization of app, mail, manager, database objects

'''

from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from .config import Config
from .celeryconfig import make_celery

app = Flask(__name__)
app.config.from_object(Config)
login_manager = LoginManager()
login_manager.init_app(app)
db = SQLAlchemy(app)
mail = Mail(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
app.secret_key = 'any random string'

celery = make_celery(app)

from .routers import (
    test,
    register,
    confirm_email,
    auth,
    reset_password,
    confirm_reset,

    )


from .routers import (test,
                      register,
                      confirm_email,
                      auth,
                      reset_password,
                      confirm_reset,
                      file_uploads,
                        send_result_to_email,
                      utils
                      )
