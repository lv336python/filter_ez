'''
Module for User model description
Added UserMixin for handling User login
session
'''
from flask_login import UserMixin

from app import db


class User(db.Model, UserMixin):
    '''
    User model for SQL database
    '''
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)# pylint: disable=E1101
    email = db.Column(db.String, unique=True, nullable=False)# pylint: disable=E1101
    password_plaintext = db.Column(db.String, nullable=False)# pylint: disable=E1101
    confirmed = db.Column(db.Boolean, nullable=False, default=False)# pylint: disable=E1101

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
