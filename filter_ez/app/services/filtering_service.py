"""
TODO
"""
from math import ceil

import pandas as pd
import numpy as np

from app import DB
from app.models import Dataset, Filter
from app.helper import UserFilesManager


def mask(dfr, key, value):
    """
    tODO
    :param dfr:
    :param key:
    :param value:
    :return:
    """
    return dfr[dfr[key] == value]


pd.DataFrame.mask = mask


def filter_masks(filters):
    """
    Function makes list of tuples with filtering params to be used in DataFrame mask
    :param filters: dictionary like: "column:{param1:{},param2:{},param3{}}"
    :return: list of tuples (column, param)
    """
    masks = tuple((key, key2) for key, val in filters.items()
                  if key != 'val' for key2 in val.keys())
    return masks


def save_filter(filters, name):
    """
    Function saves filter to DB
    :param filters: filter to be saved.
    :param name: name of filter which appear in DB table
    :return: id of saved filter
    """
    new_filter = Filter(name=name, params=filters)
    DB.session.add(new_filter)# pylint: disable=E1101
    DB.session.commit()# pylint: disable=E1101
    return new_filter.id


def dataframe_actualization(file_id, user_id):
    """
    Actualization of DataFrame by dropping results of earlier datasets
    :param file_id: file from which creates new dataset
    :return: dataFrame with available data
    """
    ufm = UserFilesManager(user_id)
    work_file = ufm.get_serialized_file_path(file_id)
    subsets = Dataset.query.filter_by(file_id=file_id).filter(Dataset.included_rows != None).all()# pylint: disable=singleton-comparison
    reserved = [x.included_rows for x in subsets]
    drop_list = [ids for subset in reserved for ids in subset]

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
    filters = Filter.query.get(filter_id).params
    dataframe = dataframe_actualization(file_id, user_id)
    result = filter_apply(dataframe, filters)
    result = [int(x) for x in result]

    new_dataframe = Dataset(file_id=file_id, user_id=user_id,
                            included_rows=result, filter_id=filter_id)
    DB.session.add(new_dataframe)
    DB.session.commit()
    return new_dataframe.id


def filter_apply(dataframe, filters):# pylint: disable=too-many-locals
    """
    Function apply user filters to given DataFrame.
    it can handle 3 filter layers
    :param dataframe: DataFrame that should be filtered
    :param filters: filter to be applied to current DataFrame
    :return: DataFrame with applied filter
    """
    result = pd.DataFrame()
    filters = filters.get('filters')
    amount = filters.get('amount')

    for mask_key, mask_val in filter_masks(filters):
        qty = amount
        subdict = filters[mask_key][mask_val]
        fract = qty * subdict.get('val')
        df0 = mask_apply(dataframe, mask_key, mask_val)

        for mask_key1, mask_val1 in filter_masks(subdict):
            subdict1 = subdict[mask_key1][mask_val1]
            fract1 = fract * subdict1.get('val')
            df1 = mask_apply(df0, mask_key1, mask_val1)

            for mask_key2, mask_val2 in filter_masks(subdict1):
                fract2 = fract1 * subdict1[mask_key2][mask_val2]
                df2 = mask_apply(df1, mask_key2, mask_val2).sample(n=ceil(fract2))
                result = result.append(df2)
                print(df2)
    print(result)
    return result.index.values


def mask_apply(dataframe, key, val):
    """
    Function check is column numeric and give value to mask in needed type
    :param dataframe: DataFrame to be filtered
    :param key: name of column
    :param val: value for filtering
    :return: filtered DataFrame
    """
    if dataframe[key].dtype == np.float64:
        return dataframe.mask(key, float(val))

    if dataframe[key].dtype == np.int64:
        return dataframe.mask(key, int(val))

    return dataframe.mask(key, val)
