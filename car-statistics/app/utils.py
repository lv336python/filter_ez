"""
Different utils like small functions that a used in different scripts
"""

import os
import time
from app import app, db
from hashlib import md5
from app.models import User
from werkzeug.security import generate_password_hash


def file_extension(filename):
    """
    Function will check file extension by extracting suffix from file name
    :param filename: filename.ext
    :return: suffix 'ext' from given filename
    """
    suffix = filename.rsplit('.', 1)[-1].lower()
    return suffix


def create_file_dir(dir_path):
    """
    Function verify that upload folder exists
    :param dir_path: directory in  which file should be saved
    :return: if path doesnt exist it will make dirs recursively
    """
    return os.path.isdir(dir_path) or os.makedirs(dir_path)


def file_dir(user_id, file_id):
    """
    Function returns path where user file is located
    :param user_id: id of file owner(user that uploaded this file)
    :param file_id: id of the file in files table in DB
    :return: path to the file directory like /user/file/
    """
    upload_dir = app.config['UPLOAD_FOLDER']
    user_id = str(user_id)
    file_id = str(file_id)
    file_directory = os.path.join(upload_dir, user_id, file_id)
    return file_directory


def file_path(dir_path, filename):
    """

    :param dir_path:
    :param filename:
    :return: file name with path to the file like /user/file/sample.txt
    """
    path_to_file = os.path.join(dir_path, filename)
    return path_to_file


def filename_hash(filename, user_id):
    """
    Function will hash filename with md5 algorithm
    :param filename: name to be hashed
    :param user_id: file owner id
    :return: hashed name
    """
    ask = app.config['SECRET_KEY']
    hash_name = md5(f'{ask}{filename}{user_id}'.encode()).hexdigest()
    return hash_name


def full_filename(name, suffix='xls'):
    """
    Function add suffix to file hashed filename
    :return: filename with extension
    """
    filename = f'{name}.{suffix}'
    return filename


def fake_users(users_count):
    """
    Function add fake users to DB without email confirmation.
    Is useful for DB filling for future testing
    email: test[i]@mail.com
    password: password
    :param users_count: number of users to be added
    :return: list of id's of added
    """
    pswrd = generate_password_hash('password')
    users_list = []
    for i in range(users_count):
        email = f'test{i}@mail.com'
        new_user = User(email=email, password_plaintext=pswrd, confirmed=True)
        db.session.add(new_user)
        db.session.commit()
        users_list.append(new_user.id)
    return users_list

