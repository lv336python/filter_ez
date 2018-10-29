# pylint: disable=invalid-name
"""
ToDo
"""
import pandas as pd

from .idataset import IDataSet


class DataSetPandas(IDataSet):
    """
        Implementation methods for pandas
    """
    def __init__(self, dataframe=None):
        self.dataframe = dataframe

    def read(self, filename):
        """
        method for read file
        :param filename:
        """
        self.dataframe = pd.read_excel(filename)

    def filter_set(self, filter):
        """
        Filter dataframe by your data
        :param filter: parameter for your filter
        :return: filtered dataframe
        """
        def mask(dataframe, key, value):
            mask = dataframe[dataframe[key] == value]
            return mask

        pd.DataFrame.mask = mask
        self.dataframe = self.dataframe.mask(*filter)

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
