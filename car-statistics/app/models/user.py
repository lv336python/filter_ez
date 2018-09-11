'''
Module for User model describing
'''
from app import db


class User(db.Model):
    '''
    User model for SQL database
    '''
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password_plaintext = db.Column(db.String, nullable=False)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password_plaintext
        }

    def __init__(self, email, password_plaintext, confirmed):
        self.email = email
        self.password_plaintext = password_plaintext
        self.confirmed = confirmed

    def __repr__(self):
        return f'<User {self.email}>'
