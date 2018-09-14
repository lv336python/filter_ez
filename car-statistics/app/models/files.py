"""
User Files model describing
"""

from app import db
from datetime import datetime


class Files(db.Model):
    """
    User files model for SQL databas
    """

    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String, nullable=False)
    hash_name = db.Column(db.String, nullable=False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    file_owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, file_name, hash_name, file_owner_id):
        self.file_name = file_name
        self.hash_name = hash_name
        self.file_owner_id = file_owner_id


class Subsets(db.Model):
    """
    Subsets model for SQL database
    """
    __tablename__ = 'subsets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    subset_name = db.Column(db.String, nullable=False)
    hash_name = db.Column(db.String, nullable=False)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    file_id = db.Column(db.Integer, db.ForeignKey('files.id'))
    subset_rel = db.Column(db.Integer, db.ForeignKey('subsets.id'))

    def __init__(self, subset_name, hash_name, file_id, subset_rel):
        self.subset_name = subset_name
        self.hash_name = hash_name
        self.file_id = file_id
        self.subset_rel = subset_rel
