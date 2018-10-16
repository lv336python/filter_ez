"""
    Module for fields definition
"""
import pandas as pd
from collections import defaultdict
from .filtering_service import dataframe_actualization
from .utils import get_user_file

from app.models import File

def mask(df, key, value):
    return df[df[key] == value]


def fields_definition(file_id, user_id, filter=False):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param file_name: parameter for your file name
    :return dict: {'Air bags': {'max': 4, 'min': 0}, 'Body': {'MPV': 11, 'Sedan': 7}, 'Climate control': {'Yes': 30, 'No': 19}}
    """

    df = dataframe_actualization(file_id, user_id)
    # df = pd.read_excel(file_name)

    if filter:
        pd.DataFrame.mask = mask
        df = df.mask(*filter)


    cl_names = list(df.columns.values)

    field_def = {}
    for cl_name in cl_names:
        cl_name_val = list(df[cl_name])
        if type(cl_name_val[0]) == str:
            field_def[cl_name] = list(set(df[cl_name]))
        else:
            field_def[cl_name] = dict(min=min(cl_name_val), max=max(cl_name_val))

    return field_def


def fields_statistics(dataset):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param dataset: dataset instance
    :return dict: {'Air bags': {4: 8, 0: 8}, 'Body': {'MPV': 11, 'Sedan': 7}, 'Climate control': {'Yes': 30, 'No': 19}}
    """
    file_path = get_user_file(dataset.file_id, dataset.user_id)  # Exchange with UserFileManager
    df = pd.read_excel(file_path)

    if dataset.included_rows:
        df = df.iloc[dataset.included_rows]

    cl_names = list(df.columns.values)

    field_def = {}
    for cl_name in cl_names:
        default_dict = defaultdict(int)
        cl_name_val = list(df[cl_name])
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
    file_path = get_user_file(dataset.file_id, dataset.user_id)  # Exchange with UserFileManager
    df = pd.read_excel(file_path)

    if dataset.included_rows:
        df = df.iloc[dataset.included_rows]

    return {'columns': list(df.columns),
            'rows': df[df.index < number_of_rows].values.tolist()}
