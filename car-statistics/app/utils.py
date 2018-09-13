"""
Different utils like small functions that a used in different scripts
"""

import os
import time
from hashlib import md5


def file_extension(filename):
    """
    Function will check file extension by extracting suffix from file name
    :param filename: filename.ext
    :return: suffix 'ext' from given filename
    """
    suffix = filename.rsplit('.', 1)[1].lower()
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
