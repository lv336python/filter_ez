import os

from app import app


def get_file(filepath):
    with open(os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filepath), 'rb') as file:
        return file.read()
