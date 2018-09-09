from app import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password_plaintext = db.Column(db.String, nullable=False)  # TEMPORARY - TO BE DELETED IN FAVOR OF HASHED PASSWORD

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password_plaintext
        }

    def __init__(self, email, password_plaintext):
        self.email = email
        self.password_plaintext = password_plaintext

    def __repr__(self):
        return f'<User {self.email}>'
