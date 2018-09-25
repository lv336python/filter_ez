import os
import pandas as pd
from app import db
from app.models import Dataset, Filter, File
from app.services.utils import serialize
from itertools import zip_longest
from math import ceil, floor
from app.services.utils import srlz_file
from pathlib import Path

file_temp = './result.pkl'


# serialize(file)


def mask(dtfr, key, value):
    return dtfr[dtfr[key] == value]
pd.DataFrame.mask = mask


hc_filter = {'count':300, 'filter':{'Make': {'Audi': {'Body': {'Sedan': {'Trim level': {'EX': 0.21, 'SE': 0.49, 'GL': 0.3}, 'val': 0.33},
                                         'SUV': {'Trim level': {'EX': 0.49, 'LS': 0.3, 'GL': 0.21}, 'val': 0.2},
                                         'Crossover': {'Trim level': {'SE': 0.15, 'GT': 0.6, 'LS': 0.25}, 'val': 0.47}}, 'val': 0.25},

                       'BMW': {'Body': {'Sedan': {'Trim level': {'EX': 0.22, 'GT': 0.58, 'GL': 0.2}, 'val': 0.22},
                                        'Hatchback': {'Trim level': {'EX': 0.36, 'GT': 0.34, 'GL': 0.3}, 'val': 0.5},
                                        'Crossover': {'Trim level': {'EX': 0.15, 'GT': 0.35, 'GL': 0.5}, 'val': 0.28}}, 'val': 0.3},

                       'Dacia': {'Body': {'MPV': {'Trim level': {'EX': 0.26, 'LS': 0.54, 'GL': 0.1}, 'val': 0.2},
                                          'SUV': {'Trim level': {'EX': 0.25, 'GT': 0.5, 'SE': 0.25}, 'val': 0.48},
                                          'Hatchback': {'Trim level': {'LS': 0.35, 'GT': 0.35, 'GL': 0.3}, 'val': 0.32}}, 'val': 0.45}}}}


def get_file(db_flpath):
    #todo: need to change it
    file_pth = Path('db_flpath')
    return file_pth


def fltr_msk(dct):
    """
    Function makes tuple with filtering params to be used in DataFrame mask
    :param dct: dictionary like column:{param1:{},param2:{},param3{}}
    :return: list of tuples (column, param)
    """
    clmn = ()
    column = [*dct]  # getting keys from dictionary
    column_fltr = dct.get(column[0])  # getting keys from subdict
    param = [*column_fltr]  # getting params from subdict keys
    return list(zip_longest(clmn, param, fillvalue=column[0]))


def fltr_blncng(fltr):
    """

    :param fltr:
    :return:
    """
    fltr_nm = 'new filter'
    fltr_prms = fltr
    new_fltr = Filter(name=fltr_nm, params=fltr_prms)
    db.session.add(new_fltr)
    db.session.commit()
    return new_fltr.id


def actual_dtfrm(file_id):
    """
    Actualization of DataFrame by dropping results of earlier datasets
    :param file_id: file from which creates new dataset
    :return: dataFrame with available data
    """
    fl_id = file_id
    # dbfile = File.query.get(fl_id)
    # drop_list = Dataset.query.filter_by(file_id=fl_id).all()
    wrk_file = file_temp
    # wrk_file = get_file(wrk_file)
    drop_list = []
    dtfrm = pd.read_pickle(wrk_file)
    print(dtfrm.shape)
    for lst in drop_list:
        dtfrm = dtfrm.drop(dtfrm.index[lst])
    print(dtfrm.shape)
    return dtfrm


def data_frame(user_id, file_id, fltr_id):
    """

    :param user_id:
    :param file_id:
    :param fltr_id:
    :return:
    """
    u_id = user_id
    ft_id = fltr_id
    dbfltr = Filter.query.get(ft_id)
    fltr = dbfltr.params

    fl_id = file_id
    dtfrm = actual_dtfrm(fl_id)
    result = filter_tree(dtfrm, fltr)
    result= [int(x) for x in result]

    new_dtfrm = Dataset(file_id=fl_id, user_id=u_id, included_rows=result, filter_id=ft_id)
    db.session.add(new_dtfrm)
    db.session.commit()
    return new_dtfrm.id


def filter_tree(dtfrm, fltr):
    """
    Function apply user filters to DataFrame.
    it can hande 3 filter layers
    :param fltr: filter to by applied
    :return: DataFrame with applied filter
    """
    df = dtfrm
    res_df = pd.DataFrame()
    fltr0 = fltr.get('filter')
    for fl0 in fltr_msk(fltr0):
        cnt0 = fltr.get('count')
        dict1 = list(fltr0.items())[0][1]
        dict2 = dict1.get(fl0[1])
        cnt1 = cnt0*dict2.get('val')
        df0 = df.mask(*fl0)

        for fl1 in fltr_msk(dict2):
            dict3 = list(dict2.items())[0][1]
            dict4 = dict3.get(fl1[1])
            cnt2 = cnt1*dict4.get('val')
            df1 = df0.mask(*fl1)

            for fl2 in fltr_msk(dict4):
                dict5 = list(dict4.items())[0][1]
                cnt3 = cnt2*dict5.get(fl2[1])
                df2 = df1.mask(*fl2).sample(n=ceil(cnt3))
                res_df = res_df.append(df2)
                print(res_df)
        print(res_df)
        return res_df.index.values

# print(df)

# for fl0 in fltr_msk(tempfilter):
#     cnt0 = ncount
#     dict1 = list(tempfilter.items())[0][1]
#     dict2 = dict1.get(fl0[1])
#     cnt1 = cnt0*dict2.get('val')
#     df0 = df.mask(*fl0)
#     for fl1 in fltr_msk(dict2):
#         dict3 = list(dict2.items())[0][1]
#         dict4 = dict3.get(fl1[1])
#         cnt2 = cnt1*dict4.get('val')
#         df1 = df0.mask(*fl1)
#         for fl2 in fltr_msk(dict4):
#             dict5 = list(dict4.items())[0][1]
#             cnt3 = cnt2*dict5.get(fl2[1])
#             df2 = df1.mask(*fl2).sample(n=ceil(cnt3))
#             res_df = res_df.append(df2)


