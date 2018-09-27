"""
    Module for fields definition
"""
import pandas as pd
from collections import defaultdict


def mask(df, key, value):
    return df[df[key] == value]


def fields_definition(file_name, filter=False):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param file_name: parameter for your file name
    :return dict: {'Air bags': {'max': 4, 'min': 0}, 'Body': {'MPV': 11, 'Sedan': 7}, 'Climate control': {'Yes': 30, 'No': 19}}
    """
    df = pd.read_excel(file_name)

    if filter:
        pd.DataFrame.mask = mask
        df = df.mask(*filter)


    cl_names = list(df.columns.values)

    field_def = {}
    for cl_name in cl_names:
        cl_name_val = list(df[cl_name])
        if type(cl_name_val[0]) == str:
            field_def[cl_name] = set(df[cl_name])
        else:
            field_def[cl_name] = dict(min=min(cl_name_val), max=max(cl_name_val))

    return field_def


def fields_statistics(file_name):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param file_name: parameter for your file name
    :return dict: {'Air bags': {4: 8, 0: 8}, 'Body': {'MPV': 11, 'Sedan': 7}, 'Climate control': {'Yes': 30, 'No': 19}}
    """
    df = pd.read_excel(file_name)
    cl_names = list(df.columns.values)

    field_def = {}
    for cl_name in cl_names:
        default_dict = defaultdict(int)
        cl_name_val = list(df[cl_name])
        for val in cl_name_val:
            if isinstance(val, float):
                val = round(val, 2)
            default_dict[val] += 1
        field_def[cl_name] = default_dict
    return field_def


def get_data_preview(file_path):
    """
    Returns dict with names of columns and first 10 or less rows
    :param file_path: path to excel file to open
    :return:
    """
    df = pd.read_excel(file_path)
    columns = list(df.columns)
    rows = df[df.index < 10].values.tolist()
    return {'columns': columns,
            'rows': rows}
