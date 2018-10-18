"""
Different utils like small functions that a used in different scripts
"""

import os
import pandas as pd
import pickle
import time
import xlrd
import xlsxwriter

from io import BytesIO
from app import app, logger, db
from app.helper import UserFilesManager
from app.models import Dataset
from app.models.files import File
from hashlib import md5
from werkzeug.utils import secure_filename
import math


def file_ext(filename):
    """
    Function will extract suffix from file name
    :param filename: filename.ext
    :return: suffix 'ext' from given filename
    """
    name = secure_filename(filename)
    suffix = name.rsplit('.', 1)[-1].lower()
    return suffix


def ext_free(filename):
    """
    Function will delete suffix from file name
    :param filename: filename.ext
    :return: filename without extension
    """
    name = filename.rsplit('.', 1)[0]
    return name


def create_dir(dir_path):
    """
    Function verify that given folder exists if not it creates it
    :param dir_path: directory to check
    :return: if path doesnt exist it will make dirs recursively
    """
    return os.path.isdir(dir_path) or os.makedirs(dir_path)


def user_dir(user_id):
    """
    Function returns path where user file is located
    :param user_id: id of file owner(user that uploaded this file)
    :return: path to the file directory like /user/file/
    """
    upload_dir = app.config['UPLOAD_FOLDER']
    directory = os.path.join(upload_dir, str(user_id))
    return directory


def save_path(directory, filename, user_id):
    """
    Function gives full path to file, filename will by hashed,
    extension will be added to file name.
    :param directory: directory file should be stored
    :param filename: name of file we want to save in directory
    :param user_id: id of User
    :return: file name with path to the file like /user/file/sample.txt
    """
    file_name = secure_filename(filename)
    suffix = file_ext(file_name)
    clear_name = ext_free(file_name)
    name_hash = hash_name(clear_name, user_id)
    name = f'{name_hash}.{suffix}'
    path_to_file = os.path.join(directory, name)
    return path_to_file


def hash_name(filename, user_id):
    """
    Function will hash filename with md5 algorithm
    :param filename: name to be hashed
    :param user_id: id of File owner
    :return: hashed name
    """
    ask = app.config['SECRET_KEY']
    hashed = md5(f'{ask}{filename}{user_id}'.encode()).hexdigest()
    return hashed


def attributes(file_path):
    """
    Get attributes of file to be stored in DB via json
    :param file_path: file which will be added to DB
    :return: json with file attributes
    """
    attrbts = dict()
    attrbts['name'] = 'name'
    attrbts['size'] = get_size_in_MB(file_path)
    attrbts['rows'] = 0
    attrbts['date'] = time.time()
    attrbts['modified'] = os.path.getctime(file_path)
    return attrbts


def get_size_in_MB(file_path):
    '''
    Function that return
    :param file_path: path to
    :return:
    '''
    file_size_in_MB = os.path.getsize(file_path) / (1024 * 1024.0)  # in MBytes
    return math.ceil(file_size_in_MB * 100) / 100  # round 2 decimals after poin


def get_user_file(file_id, user_id):
    """
    Function get path to user file by getting file name from DB
    and join it with user folder path
    :param file_id: id of needed file
    :param user_id: id of file owner
    :return: path to file
    """
    file = File.query.get(file_id)
    filename = file.path
    file_path = os.path.join(user_dir(user_id), filename)
    return file_path

def temp_file(dataset):
    """
    Function returns path where temp file is located,
    hash dataset_id with md5 algorithm and open temporary file as bytes
    :param dataset_id: id of dataset_id
    :return: path to file
    """
    file = dataset_to_excel(dataset)
    ask = app.config['SECRET_KEY']
    hashed = md5(f'{ask}{dataset.id}'.encode()).hexdigest()
    temp_folder = os.path.join(app.config['TEMP_FOLDER'], hashed)
    create_dir(app.config['TEMP_FOLDER'])
    path = f"{temp_folder}.xlsx"
    with open(path, 'wb') as out:
        out.write(file.read())
    return path


def dataset_to_excel(dataset):
    """
    Writes dataset to excel file in-memory without creating excel file in the local storage
    :param dataset_id: id of dataset to create
    :return: BytesIO object or None
    """
    try:
        t1 = time.time()
        logger.info("Start creating file: %s", t1)

        file_manager = UserFilesManager(dataset.user_id)
        path_to_file = file_manager.get_serialized_file_path(dataset.file_id)

        byte_writer = BytesIO()
        excel_writer = xlsxwriter.Workbook(byte_writer)
        sheet = excel_writer.add_worksheet('Sheet1')

        with open(path_to_file, 'rb') as file:
            df = pickle.load(file)

        if dataset.included_rows:
            df = df.iloc[dataset.included_rows].values.tolist()
            for i in range(len(dataset.included_rows)):
                for j in range(len(df[i])):
                    sheet.write(i, j, df[i][j])
        else:
            df = df.values.tolist()
            for i in range(len(df)):
                for j in range(len(df[i])):
                    sheet.write(i, j, df[i][j])

        excel_writer.close()
        byte_writer.seek(0)
        logger.info("Finished creating file in %s", time.time() - t1)
        return byte_writer
    except Exception as e:
        logger.error("Error occurred when tried to create a byteIO"
                     " object for dataset %d: %s", dataset.id, e)
        notify_admin(f"Error occurred when tried to create a byteIO"
                     f" object for dataset {dataset.id}: {e}", 'ERROR')


def serialize(file):
    """
    Serializes DataFrame extracted from .xls file.
    Create serialized DataFrame in the same directory where given file exist
    Serialized file has the same name but another extension.
    To get this file instead excel file use function serialized_file()
    :param file: path to file to serialize
    :return: shape of DataFrame
    """
    file_pth = ext_free(file)
    df_to_serialize = pd.read_excel(file)
    shape = df_to_serialize.shape
    df_to_serialize.to_pickle(f'{file_pth}.pkl')
    return shape


def serialized_file(file):
    """
    Function substitutes serialized file instead excel file
    :param file: path to file to be substituted
    :return: path to serialized file
    """
    file_pth = ext_free(file)
    return (f'{file_pth}.pkl')


def delete_files_from_dir(dir, file):
    '''
    Function that delete file from user directory
    :param dir: user directory
    :param file: user file to be deleted
    '''
    os.remove(os.path.join(dir, file))
    file = ext_free(file)
    pickle_file = f"{file}.pkl"
    os.remove(os.path.join(dir, pickle_file))
    db.session.commit()
