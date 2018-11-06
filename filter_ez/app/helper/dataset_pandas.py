# pylint: disable=invalid-name
"""
ToDo
"""
from os.path import splitext
import pandas as pd

from app.helper import DataManager
from .idataset import IDataSet

OPERATORS = {
    '==': lambda df, k, v: df[k] == v,
    '!=': lambda df, k, v: df[k] != v,
    '<': lambda df, k, v: df[k] < float(v),
    '>': lambda df, k, v: df[k] > float(v),
    'range': lambda df, k, v: (df[k] > float(v.get('from'))) & (df[k] < float(v.get('to')))
}


class DataSetPandas(IDataSet):
    """
        Implementation methods for pandas
    """

    def __init__(self, dataset_id=None):
        self.dataset_id = dataset_id
        self.dataframe = self.read()

    def read(self):
        """
        Loads dataset ot instance DataFrame.
        If dataset is not provided loads empty DataFrame.
        """
        if self.dataset_id:
            file = DataManager(self.dataset_id)
            return pd.read_pickle(file.get_serialized_file_path())
        return pd.DataFrame()

    def read_file(self, file_path):
        """
        Load DataFrame from given file.
        This method will rewrite instance DataFrame with loaded.
        :param file_path: path to file to be loaded
        """
        ext = splitext(file_path)
        if ext[-1] in ['.xls', '.xlsx']:
            self.dataframe = pd.read_excel(file_path)
        if ext[-1] == '.csv':
            self.dataframe = pd.read_excel(file_path)
        if ext[-1] == '.pkl':
            self.dataframe = pd.read_pickle(file_path)

    def actualize(self):
        """Actualize DataFrame by dropping results of all DataSets formed from this File."""
        file = DataManager(self.dataset_id)
        reserved = [x.get('included_rows') for x in file.datasets]
        drop_list = [ids for subset in reserved if subset for ids in subset]
        self.dataframe = self.dataframe.drop(drop_list)

    def filter_set(self, fltr):
        """
        Apply filter to instance DataFrame
        :param fltr: parameter for your filters
        :return: modifies instance DataFrame
        """
        params = (self.dataframe, fltr.get('column'), fltr.get('value'))
        filter_mask = OPERATORS.get(fltr.get('operator'))(*params)
        self.dataframe = self.dataframe[filter_mask]

    def get_column_names(self):
        """
        Method for getting names of columns
        :return: list with column names
        """
        cl_names = list(self.dataframe.columns.values)
        return cl_names

    def get_column_values(self, cl_name):
        """
        Methods for getting values of column
        :param cl_name: name of column
        :return: list with column values
        """
        cl_name_val = list(self.dataframe[cl_name])
        return cl_name_val

    def amount_of_rows(self, number_of_rows):
        """
        Methods that limit number of rows
        :param number_of_rows: integer numer of rows
        :return: rows
        """
        rows = self.dataframe.head(number_of_rows).values.tolist()
        return rows

    def get_rows_by_indexes(self, included_rows):
        """

        :param included_rows:
        :return:
        """
        rows = self.dataframe.loc[included_rows].values.tolist()
        return rows

    def filter_rows(self, included_rows):
        """
        Creates DataSetPandas instance with rows with identifier that is in included_rows
        :param included_rows:
        :return:
        """
        filtered = DataSetPandas(self.dataset_id)
        filtered.dataframe = filtered.dataframe.loc[included_rows]
        return filtered

    def from_rows(self, rows_idxs):
        """
        Forms DataFrame from given indexes
        :param rows_idxs: list of indexes included in DataFrame
        :return: DataFrame with given rows
        """
        return self.dataframe.loc[rows_idxs]

    def sample(self, number_of_rows):
        """
        Returns DataFrame sample with given number of rows
        :param number_of_rows: number of rows to be sampled
        :return: DataFrame with given number of rows
        """
        return self.dataframe.sample(number_of_rows)

    def content_indexes(self):
        """Returns list of DataFrame indexes."""
        return self.dataframe.index.tolist()

    def append_df(self, new_dataframe):
        """
        Appends given DataFrame to DataFrame of instance.
        :param new_dataframe: DataFrame to be added.
        """
        self.dataframe = self.dataframe.append(new_dataframe)

    def exclude(self, exclude_df):
        """
        Delete items of given DataFrame from instance DataFrame.
        :param exclude_df: DataFrame to be excluded.
        :return: modifies instance DataFrame.
        """
        self.dataframe = pd.concat([self.dataframe, exclude_df]).drop_duplicates(keep=False)

    def with_ids(self):
        """
        Adds index of dataframe as a first column so when converting
        to list it will be there
        :return: DataSetPandas
        """
        with_ids = DataSetPandas(self.dataset_id)
        with_ids.dataframe.insert(0, "ID", with_ids.dataframe.index)
        return with_ids
