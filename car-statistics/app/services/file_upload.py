"""
Service to perform file upload and related stuff.
"""

import os
from app import app
import time
from hashlib import md5


def file_uploader(file, *args, **kwargs):
    """
    :param file: Object of Werrzeug File type
    :param args:
    :param kwargs:
    :return:
    """
    # todo: reference files to specific user
    # todo: check file format by extension
    # todo: check file exists with same name

    hash_name = md5((f'{int(time.time())}{file.filename }').encode()).hexdigest()
    filename = f'{hash_name}'
    print(filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return 'done'
