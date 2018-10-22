"""
Different utils like small functions that a used in different scripts
"""
import os
from pandas import ExcelWriter as writer
import time

from io import BytesIO
from hashlib import md5

from app import app, logger
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
    ask = app.config['SECRET_KEY']
    hashed = md5(f'{ask}{dataset.id}'.encode()).hexdigest()
    temp_folder = os.path.join(app.config['TEMP_FOLDER'], hashed)
    create_dir(app.config['TEMP_FOLDER'])
    path = f"{temp_folder}.xlsx"
    with open(path, 'wb') as out:
        out.write(file.read())
    return path


def dataset_to_excel(dataframe, dataset_id):
    """
    Writes dataset to excel file in-memory without creating excel file in the local storage
    :param dataset_id: id of DataSet should be downloaded
    :param dataframe: DataFrame from DataSet
    :return: BytesIO object or None
    """
    try:
        start_time = time.time()
        logger.info("Start creating file")

        byte_writer = BytesIO()
        excel_writer = writer(byte_writer)
        dataframe.to_excel(excel_writer, 'Sheet1', index=False)

        excel_writer.close()
        byte_writer.seek(0)
        logger.info("Finished creating file in %s", time.time() - start_time)
        return byte_writer
    except Exception as exception:
        logger.error("Error occurred when tried to create a byteIO"
                     " object for dataset %d: %s", dataset_id, exception)
        notify_admin(f"Error occurred when tried to create a byteIO"
                     f" object for dataset {dataset_id}: {exception}", 'ERROR')


