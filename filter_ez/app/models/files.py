"""
User Files model describing
"""

from app import db
from datetime import datetime
# import app.helper.date_time_manager


class File(db.Model):
    """
    User files model for SQL databas
    """

    __tablename__ = 'file'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    path = db.Column(db.String, nullable=False)
    attributes = db.Column(db.JSON, nullable=True)

    datasets = db.relationship('Dataset', cascade="all, delete-orphan")  # deletes all datasets if file deleted

    def __init__(self, path, attributes):
        self.path = path
        self.attributes = attributes


class Filter(db.Model):
    """
    Filter model for migration to SQL database with rows
        [id, name, params]
        name is for representing to user what exactly parameters he applied for filtration, he chooses this name,
        params is a dict object with parameters for filtration
    """

    __tablename__ = 'filter'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    params = db.Column(db.JSON, nullable=False)

    def __init__(self, name, params):
        self.name = name
        self.params = params


class Dataset(db.Model):
    """
    Subsets model for SQL database
    """
    __tablename__ = 'dataset'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    included_rows = db.Column(db.ARRAY(db.Integer), nullable=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    file_id = db.Column(db.Integer, db.ForeignKey('file.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    filter_id = db.Column(db.Integer, db.ForeignKey('filter.id'), nullable=True)

    def __init__(self, file_id, user_id, included_rows=None, filter_id=None):
        self.date = datetime.utcnow()
        self.included_rows = included_rows
        self.file_id = file_id
        self.filter_id=filter_id
        self.user_id=user_id


