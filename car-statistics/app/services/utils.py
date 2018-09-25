"""
Different utils like small functions that a used in different scripts
"""

import os
import pandas as pd

from io import BytesIO
from app import app
from app.models import File
from flask import session
from hashlib import md5
from werkzeug.utils import secure_filename


def file_ext(filename):
    """
    Function will extract suffix from file name
    :param filename: filename.ext
    :return: suffix 'ext' from given filename
    """
    suffix = filename.rsplit('.', 1)[-1].lower()
    return suffix


def ext_free(filename):
    """
    Function will delete suffix from file name
    :param filename: filename.ext
    :return: filename without extension
    """
    nx_name = filename.rsplit('.', 1)[0]
    return nx_name


def create_dir(dir_path):
    """
    Function verify that given folder exists
    :param dir_path: directory to check
    :return: if path doesnt exist it will make dirs recursively
    """
    return os.path.isdir(dir_path) or os.makedirs(dir_path)


def user_dir(user_id, *args):
    """
    Function returns path where user file is located
    :param user_id: id of file owner(user that uploaded this file)
    :return: path to the file directory like /user/file/
    """
    upload_dir = app.config['UPLOAD_FOLDER']
    user_id = str(user_id)
    directory = os.path.join(upload_dir, user_id)
    return directory


def file_path(directory, filename):
    """
    Function gives full path to file, filename will by hashed,
    extension will be added to file name.
    :param directory: directory file should be stored
    :param filename: name of file we want to save in directory
    :return: file name with path to the file like /user/file/sample.txt
    """
    fl_name = secure_filename(filename)
    ext = file_ext(fl_name)
    nx_name = ext_free(fl_name)
    name_hsh = hash_name(nx_name)
    fll_name = f'{name_hsh}.{ext}'
    path_to_file = os.path.join(directory, fll_name)
    return path_to_file


def hash_name(filename):
    """
    Function will hash filename with md5 algorithm
    :param filename: name to be hashed
    :return: hashed name
    """
    user_id = session.get('user_id')
    ask = app.config['SECRET_KEY']
    hashed = md5(f'{ask}{filename}{user_id}'.encode()).hexdigest()
    return hashed


def attributes(file_path):
    """
    Get attributes of file to be stored in DB via json
    :param file_path: file which will be added to DB
    :return: json with file attributes
    """
    attrbts = {'name': 'new'}
    return attrbts


def get_file(filepath):
    with open(get_file_path(filepath), 'rb') as file:
        return file.read()


def get_file_path(file_id):
    file_path = File.query.filter(File.id == file_id).first().path
    upload_folder = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])
    full_path_to_file = os.path.join(upload_folder, file_path.split('uploads_temp')[1][1::]) # Temporary, to change later
    return full_path_to_file


def dataset_to_excel(dataset):
    try:
        byte_writer = BytesIO()
        excel_writer = pd.ExcelWriter(byte_writer, engine='xlwt')

        path_to_file = get_file_path(dataset.file_id)
        df = pd.read_excel(path_to_file)
        df = df.iloc[dataset.included_rows]
        df.to_excel(excel_writer, sheet_name='Sheet1', index=False)
        excel_writer.save()
        byte_writer.seek(0)
        return byte_writer
    except:
        return None
