# pylint: disable=invalid-name
"""
ToDo
"""
from os.path import splitext

import pandas as pd

from .IDataSet import IDataSet


class DataSetPandas(IDataSet):
    """
        Implementation methods for pandas
    """
    def __init__(self, dataframe=None):
        self.dataframe = dataframe

    def read(self, filepath):
        """
        method for read file
        :param filename:
        """
        ext = splitext(filepath)
        if ext[1] in ['.xls', '.xlsx']:
            self.dataframe = pd.read_excel(filepath)
            return self.dataframe
        if ext[1] == '.pkl':
            self.dataframe = pd.read_pickle(filepath)
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
        self.dataframe = self.dataframe.mask(*filters)

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
        return self.dataframe.iloc[included_rows].values.tolist()
        return rows

    def from_rows(self, rows_idxs):
        return self.dataframe.iloc[rows_idxs]

    def sample(self, number_of_rows):
        return self.dataframe.sample(number_of_rows)


