"""
Service to perform file upload
"""

import os
from app import app, db
from werkzeug.utils import secure_filename
from app.utils import file_extension
from flask import session
from app.models import Files
from app.utils import create_file_dir, name_hashing, full_filename


def file_uploader(file, *args, **kwargs):
    """
    Function adds file to Files table and saves it in users directory
    :param file: object of request.files
    :param args:
    :param kwargs:
    :return: messege that file was uploaded
    """
    name = secure_filename(file.filename)
    suffix = file_extension(name)
    hash_name = name_hashing(name)
    filename = full_filename(hash_name, suffix)
    user = session['user_id']
    new_file = Files(file_name=name, hash_name=filename, file_owner_id=user)
    db.session.add(new_file)
    db.session.commit()
    upload_dir = app.config['UPLOAD_FOLDER']
    file_dir = os.path.join(upload_dir, str(user), str(new_file.id))
    create_file_dir(file_dir)
    file_path = os.path.join(file_dir, filename)
    file.save(file_path)

    return 'Uploaded'


