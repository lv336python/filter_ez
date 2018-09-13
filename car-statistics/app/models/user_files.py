'''
User Files model describing
'''
from app import db
from datetime import datetime


class Files(db.Model):
    '''
    User files model for SQL database
    '''
    __tablename__ = 'users_files'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String, nullable=False)
    hash_name = db.Column(db.String, nullable=False)
    create_date = db.Column(db.DateTime, nullable=False,
        default=datetime.utcnow)
    file_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, file_name, hash_name, file_user_id):
        self.file_name = file_name
        self.hash_name = hash_name
        self.file_user_id = file_user_id
