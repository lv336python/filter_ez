# pylint: disable=invalid-name
"""
ToDo
"""
from os.path import splitext

import pandas as pd

from .IDataSet import IDataSet
from app.helper.new_file_manager import FileManager as Ufm


class DataSetPandas(IDataSet):
    """
        Implementation methods for pandas
    """

    def __init__(self, dataset_id):
        self.dataset_id = dataset_id
        self.dataframe = self.read()
        self.operators = {
            '==': lambda df, k, v: df[k] == v,
            '!=': lambda df, k, v: df[k] != v,
            '<': lambda df, k, v: df[k] < float(v),
            '>': lambda df, k, v: df[k] > float(v),
            '><': lambda df, k, v: df[k] > float(v.get('min')) & df[k] < float(v.get('max'))
        }

    def read(self):
        """
        method for read file
        :param file_path:
        """
        file = Ufm(self.dataset_id)
        return pd.read_pickle(file.get_serialized_file_path())

    def read_file(self, file_path):
        ext = splitext(file_path)
        if ext[1] in ['.xls', '.xlsx']:
            self.dataframe = pd.read_excel(file_path)
        if ext[1] == '.pkl':
            self.dataframe = pd.read_pickle(file_path)

    def filter_set(self, filters):
        """
        Filter dataframe by your data
        :param filters: parameter for your filters
        :return: filtered dataframe
        """
        if len(filters) > 1:
            new_dataframe = self.dataframe.copy()
            for fltr in filters:
                params = (new_dataframe, fltr.get('column'), fltr.get('value'))
                filter_mask = self.operators.get(fltr.get('operator'))(*params)
                new_dataframe[filter_mask]
            return new_dataframe
        params = (self.dataframe, filters.get('column'), filters.get('value'))
        filter_mask = self.operators.get(filters.get('operator'))(*params)
        return self.dataframe[filter_mask]

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
        rows = self.dataframe[self.dataframe.index < number_of_rows].values.tolist()
        return rows

    def get_rows_by_indexes(self, included_rows):
        rows = self.dataframe.iloc[included_rows].values.tolist()
        return rows

    def without_indecies(self):
        """
        Creates DataSetPandas instance with dataframe without first column
        :return: DataSetPandas
        """
        without_indecies = DataSetPandas(self.dataframe.drop(self.dataframe.columns[0], axis=1))
        return without_indecies

    def filter_rows(self, included_rows):
        """
        Creates DataSetPandas instance with rows with identifier that is in included_rows
        :param included_rows:
        :return:
        """
        return self.dataframe.iloc[included_rows].values.tolist()

    def from_rows(self, rows_idxs):

        """
        Forms DataFrame from given indexes
        :param rows_idxs: list of indexes included in DataFrame
        :return: DataFrame with given rows
        """
        return self.dataframe.iloc[rows_idxs]

    def sample(self, number_of_rows):
        """
        Returns DataFrame sample with given number of rows
        :param number_of_rows: number of rows to be sampled
        :return: DataFrame with given number of rows
        """
        return self.dataframe.sample(number_of_rows)
