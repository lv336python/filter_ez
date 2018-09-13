"""
    Module for fields definition
"""
import pandas as pd
from collections import defaultdict


df = pd.read_excel('result_test.xls')  # your path to file

cl_names = list(df.columns.values)


def fields_define():
    """ This function defines fields to defaultdict in dict
    to store column names, their values and count of this values in column for statistic
    :return dict: {'Air bags': {4: 8, 0: 8}, 'Body': {'MPV': 11, 'Sedan': 7}, 'Climate control': {'Yes': 30, 'No': 19}}
    """
    field_def = {}
    for cl_name in cl_names:
        def_dict = defaultdict(int)
        for val in list(df[cl_name]):
            def_dict[val] += 1
            field_def[cl_name] = def_dict
    return field_def
