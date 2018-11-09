"""
Different utils like small functions that a used in different scripts
"""
from hashlib import md5

import os

from app import APP, LOGGER
from app.helper import DataFrameWriter, DateTimeManager


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

    os.makedirs(APP.config['TEMP_FOLDER'], exist_ok=True)
    path = f"{temp_folder}.xlsx"

    with open(path, 'wb') as out:
        out.write(file.read())
    return path


def dataset_to_excel(dataset, include_ids=True):
    """
    Writes dataset to excel file in-memory without creating excel file in the local storage
    :param dataset: Users DataSet which should be transformed to excel
    :param include_ids: flag whether to include index for each row
    :return: BytesIO object or None
    """
    start_time = DateTimeManager.get_current_time()
    LOGGER.info("Start creating file")

    dataframe = dataset.to_dataframe(include_ids)
    data = DataFrameWriter.xlsx_bytes_io(dataframe)

    LOGGER.info("Finished creating file: %s", DateTimeManager.get_current_time() - start_time)
    return data
