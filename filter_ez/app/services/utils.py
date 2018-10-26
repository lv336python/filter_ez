"""
Different utils like small functions that a used in different scripts
"""
from io import BytesIO
from hashlib import md5

import os
import pickle
import time
import xlsxwriter

from app import APP, LOGGER
from app.helper import UserFilesManager
from app.services import notify_admin
from app.helper.date_time_manager import DateTimeManager

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
    :param dataset: instance of dataset
    :return: BytesIO object or None
    """
    try:
        start_time = DateTimeManager.get_current_time()
        LOGGER.info("Start creating file")

        file_manager = UserFilesManager(dataset.user_id)
        path_to_file = file_manager.get_serialized_file_path(dataset.file_id)

        byte_writer = BytesIO()
        excel_writer = xlsxwriter.Workbook(byte_writer)
        sheet = excel_writer.add_worksheet('Sheet1')

        with open(path_to_file, 'rb') as file:
            dataframe = pickle.load(file)

        if dataset.included_rows:
            dataframe = dataframe.iloc[dataset.included_rows].values.tolist()
            for i in range(len(dataset.included_rows)):
                for j in range(len(dataframe[i])):
                    sheet.write(i, j, dataframe[i][j])
        else:
            dataframe = dataframe.values.tolist()
            for i in range(len(dataframe)):# pylint: disable=consider-using-enumerate
                for j in range(len(dataframe[i])):
                    sheet.write(i, j, dataframe[i][j])

        excel_writer.close()
        byte_writer.seek(0)
        LOGGER.info("Finished creating file in %s", time.time() - start_time)
        return byte_writer
    except Exception as exception:# pylint: disable=broad-except
        LOGGER.error("Error occurred when tried to create a byteIO"
                     " object for dataset %d: %s", dataset.id, exception)
        notify_admin(f"Error occurred when tried to create a byteIO"
                     f" object for dataset {dataset.id}: {exception}", 'ERROR')
