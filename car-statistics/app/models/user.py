'''
Module for User model description
Added UserMixin for handling User login
session
'''
from datetime import datetime

from flask_login import UserMixin

from marshmallow import fields, Schema, validate, post_load

from werkzeug.security import generate_password_hash

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


    def __init__(self, email, password):
        self.email = email
        self.password = generate_password_hash(password)

    def __repr__(self):
        return f'User: {self.email}, {self.password}'

class UserSchema(Schema):
    """
    Data validation
    with library marshmallow
    """
    reg_email = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    res_pass = r"^[A-Za-z0-9_-]*$"
    email = fields.Email(required=True, validate=validate.Regexp(regex=reg_email, flags=0))
    password = fields.String(required=True,
                             validate=validate.Regexp(regex=res_pass,
                                                      flags=0,
                                                      error='Password must include '
                                                            'only letters and numbers'))

    @post_load
    def make_user(self, data):
        """
        Method that creates user
        :param data:
        :return: User object
        """
        return User(**data)
