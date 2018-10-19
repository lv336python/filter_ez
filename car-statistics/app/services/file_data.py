"""
    Module for fields definition and fields statistics
"""
from collections import defaultdict
import pickle
from app import logger
from app.helper import DataSetPandas, UserFilesManager


def fields_definition(filename, filter=None):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param filename: parameter for your filename
    :param filter: tuple: name of column and value for filter
    :return dict: {'Air bags': {'max': 4, 'min': 0}, 'Body': ['MPV', 'SUV', [Sedan],
    'Climate control': ['Yes', 'No']}
    """
    dataframe = DataSetPandas()
    logger.info(filename)
    dataframe.read(filename)

    if filter:
        dataframe.filter_set(filter)

    cl_names = dataframe.get_column_names()

    field_def = {}
    for cl_name in cl_names:
        cl_name_val = dataframe.get_column_values(cl_name)
        if isinstance(cl_name_val[0], str):
            field_def[cl_name] = list(set(dataframe.get_column_values(cl_name)))
        else:
            field_def[cl_name] = dict(min=min(cl_name_val), max=max(cl_name_val))

    return field_def


def fields_statistics(dataset):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param dataset: dataset instance
    :return dict: {'Air bags': {4: 8, 0: 8}, 'Body': {'MPV': 11, 'Sedan': 7}, 'Climate control': {'Yes': 30, 'No': 19}}
    """
    ufm = UserFilesManager(dataset.user_id)
    file_path = ufm.get_serialized_file_path(dataset.file_id)  # Exchange with UserFileManager

    with open(file_path, 'rb') as file:
        dataframe = DataSetPandas(pickle.load(file))

    if dataset.included_rows:
        dataframe.dataframe = dataframe.dataframe.iloc[dataset.included_rows]

    cl_names = list(dataframe.get_column_names())

    field_def = {}
    for cl_name in cl_names:
        default_dict = defaultdict(int)
        cl_name_val = list(dataframe.get_column_values(cl_name))
        for val in cl_name_val:
            default_dict[val] += 1
        field_def[cl_name] = default_dict
    return field_def


def get_data_preview(dataset, number_of_rows):
    """
    Returns dict with names of columns and first 10 or less rows
    :param dataset: dataset instance
    :param number_of_rows: number of rows to show
    :return: dict with list with names of columns and list with lists of values of rows
    """
    ufm = UserFilesManager(dataset.user_id)
    file_path = ufm.get_serialized_file_path(dataset.file_id)  # Exchange with UserFileManager

    with open(file_path, 'rb') as file:
        dataframe = DataSetPandas(pickle.load(file))

    if dataset.included_rows:
        dataframe.dataframe = dataframe.dataframe.iloc[dataset.included_rows]

    return {'columns': list(dataframe.get_column_names()),
            'rows': dataframe.amount_of_rows(number_of_rows)}
