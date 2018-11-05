# pylint: disable=invalid-name
"""
ToDo
"""

class IDataSet:
    """
    ToDo
    """
    def read(self):  # pylint: disable=missing-docstring
        raise NotImplementedError

    def read_file(self, file_path): # pylint: disable=missing-docstring
        raise NotImplementedError

    def filter_set(self, fltr): # pylint: disable=missing-docstring
        raise NotImplementedError

    def get_column_names(self):  # pylint: disable=missing-docstring
        raise NotImplementedError

    def get_column_values(self, cl_name):  # pylint: disable=missing-docstring
        raise NotImplementedError

    def amount_of_rows(self, number_of_rows): # pylint: disable=missing-docstring
        raise NotImplementedError

    def get_rows_by_indexes(self, included_rows):# pylint: disable=missing-docstring
        raise NotImplementedError

    def with_ids(self): # pylint: disable=missing-docstring
        raise NotImplementedError

    def from_rows(self, rows_idxs): # pylint: disable=missing-docstring
        raise NotImplementedError

    def sample(self, number_of_rows): # pylint: disable=missing-docstring
        raise NotImplementedError

    def content_indexes(self): # pylint: disable=missing-docstring
        raise NotImplementedError

    def append_df(self, new_dataframe): # pylint: disable=missing-docstring
        raise NotImplementedError
