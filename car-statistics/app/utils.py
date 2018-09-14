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


def name_hashing(name):
    """
    Function will hash filename with md5 algorithm
    :param name: name to be hashed
    :return: hashed name
    """
    hash_time = int(time.time())
    hash_name = md5(f'{hash_time}{name}'.encode()).hexdigest()
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

