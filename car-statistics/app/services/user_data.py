"""
Service to perform file upload
"""

import os
from app import app, db
from werkzeug.utils import secure_filename
from app.utils import file_extension
from flask import session, flash
from app.models import Files
from app.utils import create_file_dir, filename_hash, full_filename, file_path, file_dir


def upload_file(file, *args, **kwargs):
    """
    Function adds file to Files table and saves it in users directory
    :param file: object of request.files
    :param args:
    :param kwargs:
    :return: messege that file was uploaded
    """
    user_id = session['user_id']
    name = secure_filename(file.filename)
    suffix = file_extension(name)
    hash_name = filename_hash(name, user_id)
    filename = full_filename(hash_name, suffix)
    new_file = Files(file_name=name, =filename, file_owner_id=user_id)
    db.session.add(new_file)
    db.session.commit()
    location = file_dir(user_id, new_file.id)
    create_file_dir(file_dir)
    filepath = file_path(location, filename)
    file.save(filepath)
    flash('File Uploaded', category='success')
    return 'Uploaded'


def rename_file(file_id, new_name, *args, **kwargs):
    """

    :param user_id:
    :param file_id:
    :param new_name:
    :param args:
    :param kwargs:
    :return:
    """

    pass


def delete_file(file_id):
    """

    :param user_id:
    :param file_id:
    :return:
    """
    file = db.session.query(Files).filter_by(item_id=file_id).delete()
    db.session.commit()
    location = file_dir(file.file_owner_id, file.id)
    filepath = file_path(location, file.hash_name)
    os.remove(filepath)
    flash('File Deleted', category='success')
    return 'Deleted'


