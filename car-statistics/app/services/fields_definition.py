"""
    Module for fields definition
"""
import pandas as pd
import json
from collections import defaultdict


def fields_definition(file_name):
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
        if type(cl_name_val[0]) == str:
            for val in cl_name_val:
                default_dict[val] += 1
                field_def[cl_name] = default_dict
                # field_def[cl_name] = list(set(df[cl_name]))
        else:
            field_def[cl_name] = dict(min=min(cl_name_val), max=max(cl_name_val))

    # with open(f'{file_name}.json', 'w') as outfile:
    #     json.dump(field_def, outfile)
    return field_def
