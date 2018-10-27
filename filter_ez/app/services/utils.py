"""
Different utils like small functions that a used in different scripts
"""
from hashlib import md5

import os
import time

from app import APP, LOGGER
from app.helper.writer_manager import DataFrameWriter
from app.services import notify_admin


def create_dir(dir_path):
    """
    Function verify that given folder exists if not it creates it
    :param dir_path: directory to check
    :return: if path doesnt exist it will make dirs recursively
    """
    return os.path.isdir(dir_path) or os.makedirs(dir_path)


def temp_file(dataset):
    """
    Function returns path where temp file is located,
    hash dataset.id with md5 algorithm and open temporary file as bytes
    :param dataset: dataset instance
    :return: path to file
    """
    file = dataset_to_excel(dataset)
    ask = APP.config['SECRET_KEY']
    hashed = md5(f'{ask}{dataset.id}'.encode()).hexdigest()
    temp_folder = os.path.join(APP.config['TEMP_FOLDER'], hashed)
    create_dir(APP.config['TEMP_FOLDER'])
    path = f"{temp_folder}.xlsx"
    with open(path, 'wb') as out:
        out.write(file.read())
    return path


def dataset_to_excel(dataset):
    """
    Writes dataset to excel file in-memory without creating excel file in the local storage
    :param dataset: Users DataSet which should be transformed to excel
    :return: BytesIO object or None
    """
    try:
        start_time = time.time()
        LOGGER.info("Start creating file")

        dataframe = dataset.to_dataframe()
        data = DataFrameWriter.xlsx_bytes_io(dataframe)

        LOGGER.info("Finished creating file in %s", time.time() - start_time)
        return data
    except Exception as exception: # pylint: disable=W0703
        LOGGER.error("Error occurred when tried to create a byteIO"
                     " object for dataset %d: %s", dataset.id, exception)
        notify_admin(f"Error occurred when tried to create a byteIO"
                     f" object for dataset {dataset.id}: {exception}", 'ERROR')
