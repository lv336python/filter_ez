"""
    Module for fields definition and fields statistics
"""
from collections import defaultdict
import pickle

from flask import session

from app import CELERY, LOGGER, SOCKETIO
from app.helper import DataSetPandas, UserFilesManager


def fields_definition(filename, filters=None):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param filename: parameter for your filename
    :param filters: tuple: name of column and value for filter
    :return dict: {'Air bags': {'max': 4, 'min': 0}, 'Body': ['MPV', 'SUV', [Sedan],
    'Climate control': ['Yes', 'No']}
    """
    dataframe = DataSetPandas()
    LOGGER.info(filename)
    dataframe.read_file(filename)

    if filters:
        dataframe.filter_set(filters)

    cl_names = dataframe.get_column_names()

    field_def = {}
    for cl_name in cl_names:
        cl_name_val = dataframe.get_column_values(cl_name)
        if isinstance(cl_name_val[0], str):
            field_def[str(cl_name)] = list(set(dataframe.get_column_values(cl_name)))
        else:
            field_def[str(cl_name)] = dict(min=min(cl_name_val), max=max(cl_name_val))

    return field_def

@CELERY.task
def get_statistics(dataframe, dataset_id=None, room_id=None):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistics.
    If room_id is given result will be sent via sockets with message name - statistics + dataset_id
    :param dataframe: dataframe to get statistics of
    :param dataset_id: id of dataset needed if room_id is given
    :param room_id: identifier of recipient to send result via sockets
    :return: statistics data
    """
    cl_names = list(dataframe.get_column_names())

    field_def = {}
    for cl_name in cl_names:
        default_dict = defaultdict(int)
        cl_name_val = list(dataframe.get_column_values(cl_name))
        for val in cl_name_val:
            default_dict[val] += 1
        field_def[cl_name] = default_dict

    if room_id:
        SOCKETIO.emit('statistics'+str(dataset_id), field_def, room=room_id)
    return field_def


def fields_statistics(dataset, non_blocking=False):
    """
    Prepares data and invokes get_statistics function
    :param dataset: dataset object to get statistics of
    :param non_blocking: boolean value to point if data shall be processed sequentially or using
    celery worker
    :return: json with statistics information of None if non_blocking set to True
    """
    ufm = UserFilesManager(dataset.user_id)
    file_path = ufm.get_serialized_file_path(dataset.file_id)  # Exchange with UserFileManager

    with open(file_path, 'rb') as file:
        dataframe = DataSetPandas(pickle.load(file))

    if dataset.included_rows:
        dataframe = dataframe.filter_rows(dataset.included_rows)

    dataframe = dataframe.without_indecies()

    if non_blocking:
        get_statistics.apply_async([dataframe, dataset.id, int(session['user_id'])],
                                   serializer='pickle')
        return None
    return get_statistics(dataframe)


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
