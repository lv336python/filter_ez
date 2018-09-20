"""
User Files model describing
"""

from app import db


class Files(db.Model):
    """
    User files model for SQL databas
    """

    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String, nullable=False)
    file_path = db.Column(db.String, nullable=False)
    file_spec = db.Column(db.JSON, nullable=False)
    file_owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, file_name, file_path, file_spec, table_content, file_owner_id):
        self.file_name = file_name
        self.file_path = file_path
        self.file_spec = file_spec
        self.file_owner_id = file_owner_id
