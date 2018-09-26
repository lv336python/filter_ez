import os
import pandas as pd

from app import db
from app.models import Dataset, Filter
from math import ceil
from pathlib import Path
from app.services.utils import serialized_file, get_user_file

file_temp = './result.pkl'

hc_filter = {
    'amount': 300,
    'filter': {
        'Make': {
            'Audi': {
                'Body': {
                    'Sedan': {
                        'Trim level': {
                            'EX': 0.21, 'SE': 0.49, 'GL': 0.3
                        },
                        'val': 0.33
                    },
                    'SUV': {
                        'Trim level': {
                            'EX': 0.49, 'LS': 0.3, 'GL': 0.21
                        },
                        'val': 0.2
                    },
                    'Crossover': {
                        'Trim level': {
                            'SE': 0.15, 'GT': 0.6, 'LS': 0.25
                        },
                        'val': 0.47}
                },
                'val': 0.25},

            'BMW': {
                'Body': {
                    'Sedan': {
                        'Trim level': {
                            'EX': 0.22, 'GT': 0.58, 'GL': 0.2},
                        'val': 0.22
                    },
                    'Hatchback': {
                        'Trim level': {
                            'EX': 0.36, 'GT': 0.34, 'GL': 0.3},
                        'val': 0.5
                    },
                    'Crossover': {
                        'Trim level': {
                            'EX': 0.15, 'GT': 0.35, 'GL': 0.5},
                        'val': 0.28}
                },
                'val': 0.3},

            'Dacia': {
                'Body': {
                    'MPV': {
                        'Trim level': {
                            'EX': 0.26, 'LS': 0.54, 'GL': 0.1},
                        'val': 0.2
                    },
                    'SUV': {
                        'Trim level': {
                            'EX': 0.25, 'GT': 0.5, 'SE': 0.25},
                        'val': 0.48},
                    'Hatchback': {
                        'Trim level': {
                            'LS': 0.35, 'GT': 0.35, 'GL': 0.3},
                        'val': 0.32}
                },
                'val': 0.45}
        }
    }
}


def mask(df, key, value):  # DataFrame custom mask
    return df[df[key] == value]


pd.DataFrame.mask = mask  # mask reload for DF


def get_file(db_flpath):
    # todo: need to change it
    file_pth = Path('db_flpath')
    return file_pth


def filter_masks(filter):
    """
    Function makes list of tuples with filtering params to be used in DataFrame mask
    :param filter: dictionary like: "column:{param1:{},param2:{},param3{}}"
    :return: list of tuples (column, param)
    """
    masks = tuple((key, key2) for key, val in filter.items() if key != 'val' for key2 in val.keys())
    return masks

def fltr_blncng(fltr):
    """
    Function for balancing filter params to get exactly needed amount of rows in DataSet
    :param fltr: filter which to balance
    :return: balanced filter
    """
    fltr_nm = 'new filter'

    return new_fltr.id


def save_filter(filter, name):
    """
    Function saves filter to DB
    :param filter: filter to be saved.
    :param name: name of filter which appear in DB table
    :return: id of saved filter
    """
    new_filter = Filter(name=name, params=filter)
    db.session.add(new_filter)
    db.session.commit()
    return new_filter.id


def dataframe_actualization(file_id, user_id):
    """
    Actualization of DataFrame by dropping results of earlier datasets
    :param file_id: file from which creates new dataset
    :return: dataFrame with available data
    """
    file = get_user_file(file_id, user_id)
    subsets = [x.included_rows for x in Dataset.query.filter_by(file_id=file_id).filter(Dataset.included_rows != None).all()]
    drop_list = list()
    drop_list = [ids for subset in subsets for ids in subset]
    work_file = serialized_file(file)

    dataframe = pd.read_pickle(work_file)
    print(dataframe.shape)
    dataframe = dataframe.drop(dataframe.index[drop_list])
    print(dataframe.shape)
    return dataframe


def make_dataset(user_id, file_id, filter_id):
    """
    Function form DataSet from File with given id by applying given filter.
    After filtration DataSet is added to DB
    :param user_id: id of User which currently works with this data
    :param file_id: id of a File from which should we get DataSet
    :param filter_id: id of Filter which we apply to File and total amount of rows for DataSet
    :return: id of created DataSet
    """
    filters = Filter.query.get(filter_id).params  # getting params for filtering from DB
    dataframe = dataframe_actualization(file_id, user_id)  # getting actual DataFrame with dropped earlier DataSets formed from same File
    result = filtering(dataframe, filters)  # getting results from filtering function as a list of included rows indexes
    result = [int(x) for x in result]  # transform numpy int[64] to regular int to store array in DB

    new_dataframe = Dataset(file_id=file_id, user_id=user_id, included_rows=result, filter_id=filter_id)
    db.session.add(new_dataframe)
    db.session.commit()
    return new_dataframe.id


def filtering(dataframe, filter):
    """
    Function apply user filters to given DataFrame.
    it can handle 3 filter layers
    :param dataframe: DataFrame that should be filtered
    :param filter: filter to be applied to current DataFrame
    :return: DataFrame with applied filter
    """
    result = pd.DataFrame()  # creating empty DataFrame
    filters = filter.get('filter')  # getting filters
    amount = filter.get('amount')  # getting size of DataSet

    for mask_key, mask_val in filter_masks(filters):  # fl[n] is mask for filtering in list of masks for this layer
        qty = amount  # getting total amount of items for DataSet
        subdict = filters[mask_key][mask_val]  # getting sub dict from dict
        fract = qty * subdict.get('val')  # get fraction for this filter
        df0 = dataframe.mask(mask_key, mask_val)  # filtering DataFrame

        for mask_key1, mask_val1 in filter_masks(subdict):
            subdict1 = subdict[mask_key1][mask_val1]  # getting sub dict from dict
            fract1 = fract * subdict1.get('val')  # get fraction for this filter
            df1 = df0.mask(mask_key1, mask_val1)  # filtering DataFrame

            for mask_key2, mask_val2 in filter_masks(subdict1):
                fract2 = fract1 * subdict1[mask_key2][mask_val2]
                df2 = df1.mask(mask_key2, mask_val2).sample(n=ceil(fract2))  # filtering DataFrame, extracting number of random rows
                result = result.append(df2)  # appending filtered results to DataSet
                print(df2)
    print(result)
    return result.index.values  # list of indexes which get to DataSet
