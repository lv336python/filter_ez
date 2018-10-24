"""
User Files model describing
"""

from datetime import datetime
from app import DB


class File(DB.Model):# pylint: disable=R0903
    """
    User files model for SQL databas
    """

    __tablename__ = 'file'

    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)# pylint: disable=E1101
    path = DB.Column(DB.String, nullable=False)# pylint: disable=E1101
    attributes = DB.Column(DB.JSON, nullable=True)# pylint: disable=E1101
    datasets = DB.relationship('Dataset', cascade="all, delete-orphan")# pylint: disable=E1101

    def __init__(self, path, attributes):
        self.path = path
        self.attributes = attributes


class Filter(DB.Model):# pylint: disable=R0903
    """
    Filter model for migration to SQL database with rows
        [id, name, params]
        name is for representing to user what exactly parameters
         he applied for filtration, he chooses this name,
        params is a dict object with parameters for filtration
    """

    __tablename__ = 'filter'

    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)# pylint: disable=E1101
    name = DB.Column(DB.String, nullable=False)# pylint: disable=E1101
    params = DB.Column(DB.JSON, nullable=False)# pylint: disable=E1101

    def __init__(self, name, params):
        self.name = name
        self.params = params


class Dataset(DB.Model):# pylint: disable=R0903
    """
    Subsets model for SQL database
    """
    __tablename__ = 'dataset'

    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)# pylint: disable=E1101
    included_rows = DB.Column(DB.ARRAY(DB.Integer), nullable=True)# pylint: disable=E1101
    date = DB.Column(DB.DateTime, nullable=False, default=datetime.utcnow)# pylint: disable=E1101
    file_id = DB.Column(DB.Integer, DB.ForeignKey('file.id', ondelete="CASCADE"))# pylint: disable=E1101
    user_id = DB.Column(DB.Integer, DB.ForeignKey('users.id'))# pylint: disable=E1101
    filter_id = DB.Column(DB.Integer, DB.ForeignKey('filter.id'), nullable=True)# pylint: disable=E1101

    def __init__(self, file_id, user_id, included_rows=None, filter_id=None):
        self.date = datetime.utcnow()
        self.included_rows = included_rows
        self.file_id = file_id
        self.filter_id = filter_id
        self.user_id = user_id
