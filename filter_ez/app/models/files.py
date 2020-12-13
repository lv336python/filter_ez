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

    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)
    path = DB.Column(DB.String, nullable=False, unique=True)
    attributes = DB.Column(DB.JSON, nullable=True)
    datasets = DB.relationship('Dataset', cascade="all, delete-orphan")

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

    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)
    name = DB.Column(DB.String, nullable=False)
    params = DB.Column(DB.JSON, nullable=False)

    def __init__(self, name, params):
        self.name = name
        self.params = params


class Dataset(DB.Model):# pylint: disable=R0903
    """
    Subsets model for SQL database
    """
    __tablename__ = 'dataset'

    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)
    included_rows = DB.Column(DB.ARRAY(DB.String), nullable=True)
    date = DB.Column(DB.DateTime, nullable=False, default=datetime.utcnow)
    file_id = DB.Column(DB.Integer, DB.ForeignKey('file.id', ondelete="CASCADE"))
    user_id = DB.Column(DB.Integer, DB.ForeignKey('users.id'))
    filter_id = DB.Column(DB.Integer, DB.ForeignKey('filter.id'), nullable=True)

    def __init__(self, file_id, user_id, included_rows=None, filter_id=None):
        self.date = datetime.utcnow()
        self.included_rows = included_rows
        self.file_id = file_id
        self.filter_id = filter_id
        self.user_id = user_id
