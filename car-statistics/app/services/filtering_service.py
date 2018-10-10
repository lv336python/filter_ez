import pandas as pd
import numpy as np

from app import db
from app.models import Dataset, Filter
from math import ceil
from app.services.utils import serialized_file, get_user_file


def mask(df, key, value):  # DataFrame custom mask
    return df[df[key] == value]


pd.DataFrame.mask = mask  # mask reload for DF


def filter_masks(filter):
    """
    Function makes list of tuples with filtering params to be used in DataFrame mask
    :param filter: dictionary like: "column:{param1:{},param2:{},param3{}}"
    :return: list of tuples (column, param)
    """
    masks = tuple((key, key2) for key, val in filter.items() if key != 'val' for key2 in val.keys())
    return masks


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
    subsets = Dataset.query.filter_by(file_id=file_id).filter(Dataset.included_rows != None).all()
    reserved = [x.included_rows for x in subsets]
    drop_list = list()
    drop_list = [ids for subset in reserved for ids in subset]
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
    result = filter_apply(dataframe, filters)  # getting results from filtering function as a list of included rows indexes
    result = [int(x) for x in result]  # transform numpy int[64] to regular int to store array in DB

    new_dataframe = Dataset(file_id=file_id, user_id=user_id, included_rows=result, filter_id=filter_id)
    db.session.add(new_dataframe)
    db.session.commit()
    return new_dataframe.id


def filter_apply(dataframe, filter):
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
        df0 = mask_apply(dataframe, mask_key, mask_val)  # filtering DataFrame

        for mask_key1, mask_val1 in filter_masks(subdict):
            subdict1 = subdict[mask_key1][mask_val1]  # getting sub dict from dict
            fract1 = fract * subdict1.get('val')  # get fraction for this filter
            df1 = mask_apply(df0, mask_key1, mask_val1)  # filtering DataFrame

            for mask_key2, mask_val2 in filter_masks(subdict1):
                fract2 = fract1 * subdict1[mask_key2][mask_val2]
                df2 = mask_apply(df1, mask_key2, mask_val2).sample(n=ceil(fract2))  # filtering DataFrame, extracting number of random rows
                result = result.append(df2)  # appending filtered results to DataSet
                print(df2)
    print(result)
    return result.index.values  # list of indexes which get to DataSet


def filters(file_id, user_id, key = False, value = False, buff=False):
    file = get_user_file(file_id, user_id)
    file = serialized_file(file)
    df = pd.read_pickle(file)
    # df = pd.read_excel(file)
    if not buff:
        dbuf(key, value)
        print(dbuf)

    return definition(df)


def definition(df):  # copied part of Oleksandr's function

    cl_names = list(df.columns.values)
    field_def = {}
    for cl_name in cl_names:
        field_def[cl_name] = set(df[cl_name])
    return field_def


def deep_filtering(dataframe):
    """
    Function for deep filtering DataFrame
    :param dataframe:
    """
    df = dataframe

    def filter_by_mask(key, value):
        nonlocal df
        result = df.mask(key, value)
        return result
    return filter_by_mask


def masks_accu():
    """
    Function for buffering dataframe masks forming list of pairs (filter, value)
    """
    filters = list()

    def buffer(key, value):
        nonlocal filters
        fl = (key, value)
        filters.append(fl)
        return filters
    return buffer


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
