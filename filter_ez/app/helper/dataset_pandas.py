# pylint: disable=invalid-name
"""
ToDo
"""
from os.path import splitext

import pandas as pd

from .idataset import IDataSet


class DataSetPandas(IDataSet):
    """
        Implementation methods for pandas
    """
    def __init__(self, dataframe=None):
        self.dataframe = dataframe

    def read(self, file_path):
        """
        method for read file
        :param file_path:
        """
        ext = splitext(file_path)
        if ext[1] in ['.xls', '.xlsx']:
            self.dataframe = pd.read_excel(file_path)
        if ext[1] == '.pkl':
            self.dataframe = pd.read_pickle(file_path)
        return self.dataframe

    def filter_set(self, filters):
        """
        Filter dataframe by your data
        :param filters: parameter for your filters
        :return: filtered dataframe
        """
        def mask(dataframe, key, value):
            mask = dataframe[dataframe[key] == value]
            return mask

        pd.DataFrame.mask = mask
        return self.dataframe.mask(*filters)

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
