import os

from app import app
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_file(filepath):
    with open(os.path.join(app.config['UPLOAD_FOLDER'], filepath), 'rb') as file:
        return file.read()
