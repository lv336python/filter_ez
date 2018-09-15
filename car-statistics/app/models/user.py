'''
Module for User model description
Added UserMixin for handling User login
session
'''
from datetime import datetime

from flask_login import UserMixin

from marshmallow import fields, Schema

from app import db



class User(db.Model, UserMixin):
    '''
    User model for SQL database
    '''
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)# pylint: disable=E1101
    email = db.Column(db.String, unique=True, nullable=False)# pylint: disable=E1101
    password = db.Column(db.String, nullable=False)# pylint: disable=E1101
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())# pylint: disable=E1101
    confirmed_date = db.Column(db.DateTime, nullable=True)# pylint: disable=E1101
    confirmed = db.Column(db.Boolean, nullable=False, default=False)# pylint: disable=E1101


    def __init__(self, email, password, confirmed):
        self.email = email
        self.password = password
        self.confirmed = confirmed

    def __repr__(self):
        return f'<User {self.email}>'

class UserSchema(Schema):
    """
    Data validation
    with library marshmallow
    """
    email = fields.Email(required=True)
    password = fields.String(required=True)
