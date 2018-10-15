"""
    Module for fields definition and field statistics
"""
from collections import defaultdict
from app.helper.DataSetPandas import DataSetPandas


def fields_definition(filename, filter=None):
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param file_name: parameter for your filename
    :param filter: tuple: name of column and value for filter
    :return dict: {'Air bags': {'max': 4, 'min': 0}, 'Body': ['MPV', 'SUV', [Sedan],
    'Climate control': ['Yes', 'No']}
    """
    dataframe = DataSetPandas()
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


def fields_statistics(filename):
    """This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :param file_name: parameter for your file name
    :return dict: {'Air bags': {4: 8, 0: 8}, 'Body': {'MPV': 11, 'Sedan': 7},
    'Climate control': {'Yes': 30, 'No': 19}}
    """
    dataframe = DataSetPandas()
    dataframe.read(filename)

    cl_names = list(dataframe.get_column_names())

    field_def = {}
    for cl_name in cl_names:
        default_dict = defaultdict(int)
        cl_name_val = list(dataframe.get_column_values(cl_name))
        for val in cl_name_val:
            if isinstance(val, float):
                val = round(val, 2)
            default_dict[val] += 1
        field_def[cl_name] = default_dict
    return field_def


def get_data_preview(file_path, number_of_rows=10):
    """
    Returns dict with names of columns and first 10 or less rows
    :param file_path: path to excel file to open
    :param number_of_rows: number of rows to show
    :return:
    """
    dataframe = DataSetPandas()
    dataframe.read(file_path)

    columns = list(dataframe.get_column_names())
    rows = dataframe.amount_of_rows(number_of_rows)
    return {'columns': columns,
            'rows': rows}
