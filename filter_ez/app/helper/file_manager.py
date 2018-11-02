"""
Module with class FileManager which takes responsibility for saving and deleting files
in a given directory. This class is expected to work with files with extension xls, xlsx and csv
and serialization is carried out on pandas DataFrame objects
"""

from datetime import datetime
import os
from hashlib import md5

import pandas as pd


class FileManager:
    """
    Manager for saving files. works with objects which have such predetermined methods
    as seek, save and filename parameter
    """
    def __init__(self, directory='./'):
        """
        :param directory: directory for saving file
        """
        self.directory = directory

    def upload_file(self, file):
        """
        Saves file in original format and as a serialized pandas data frame
        :param file: object with implemented functions seek, save and filename parameter
        :return: parameters of file or None
        """
        file_full_name = self.save_file(file)
        shape = self.serialize(file_full_name)
        if not shape:
            return None

        file_attributes = self.get_file_attributes(os.path.join(self.directory, file_full_name))
        file_attributes['rows'] = shape[0]
        file_attributes['cols'] = shape[1]
        file_attributes['name'] = file.filename
        return file_attributes

    def save_file(self, file):
        """
        Checks if file in directory and if it's returns its name, if not, saves it.
        :param file: object with implemented functions seek, save and filename parameter
        :return: name of file or None
        """
        file_full_name = self.get_name_for_saving(file)
        files_in_directory = self.get_files_in_directory(self.directory)

        if file_full_name not in files_in_directory:
            file.seek(0)
            file.save(os.path.join(self.directory, file_full_name))

        return file_full_name

    def delete_file(self, file_name):
        """
        Deletes file with given file name if file exists in the directory.
        :param file_name: full name of file with extension
        """
        if file_name in self.get_files_in_directory(self.directory):
            os.remove(os.path.join(self.directory, file_name))
            serialized_file = self.get_serialized_file_name(file_name)
            os.remove(os.path.join(self.directory, serialized_file))

    def serialize(self, file_full_name):
        """
        Serializes DataFrame extracted from .xlsx file.
        Create serialized DataFrame in the same directory where given file exist
        Serialized file has the same name but another extension.
        To get this file instead excel file use function serialized_file()
        :param file_full_name: name of the file with extension
        :param extension: extension of file to serialize, if its xlsx or xls pandas.read_excel
            used, if it is csv, pandas.read_csv used, otherwise return None
        :return: shape of DataFrame
        """
        file_path = os.path.join(self.directory, file_full_name)
        extension = self.get_file_extension(file_full_name)

        if extension in ('xlsx', 'xls'):
            df_to_serialize = pd.read_excel(file_path)
        elif extension == 'csv':
            df_to_serialize = pd.read_csv(file_path, sep=';')
        else:
            return None

        # check if the table has first column all unique values
        num_of_values = df_to_serialize[df_to_serialize.columns[0]].shape[0]
        num_of_unique_values = len(set(df_to_serialize[df_to_serialize.columns[0]]))

        if num_of_unique_values != num_of_values:
            return None

        id_column = df_to_serialize.columns[0]
        df_to_serialize[id_column] = df_to_serialize[id_column].astype(str)

        serialized_file_name = self.get_serialized_file_name(file_full_name)
        df_to_serialize.to_pickle(os.path.join(self.directory, serialized_file_name))

        shape = df_to_serialize.shape
        return shape

    @classmethod
    def get_file_attributes(cls, file_path):
        """
        Retrieves local file attributes such as size and date of last modification
        :param file_path: path to file
        :return: dict with attributes
        """
        attributes = dict()
        attributes['saved_name'] = os.path.basename(file_path)
        attributes['size'] = round(os.path.getsize(file_path), 2)
        attributes['modified'] = datetime.utcfromtimestamp(os.path.getmtime(file_path)).isoformat()
        return attributes

    @classmethod
    def get_files_in_directory(cls, directory):
        """
        Retrieves list of file names from given directory
        :param directory: path to folder for checking
        :return: list with file names
        """
        return [file_name for file_name in os.listdir(directory)
                if os.path.isfile(os.path.join(directory, file_name))]

    @classmethod
    def get_file_extension(cls, file_name):
        """
        Splits file in two using dot as a delimiter and gets the second part which is considered
        to represent file extension.
        :param file_name: name of the file
        :return: file extension or None
        """
        if '.' in file_name:
            return file_name.rsplit('.', 1)[-1].lower()
        return None

    @classmethod
    def get_file_name(cls, file_name):
        """
        Splits file in two using dot as a delimiter and gets the first part which is considered
        to represent file name. If there is no dot, file_name is returned
        :param file_name: name of the file
        :return: file name or given argument
        """
        if '.' in file_name:
            return file_name.rsplit('.', 1)[0]
        return file_name

    @classmethod
    def validate_file_extension(cls, filename, allowed_extensions=('xls', 'xlsx', 'csv')):
        """
        Checks if file extension is one that exists in the allowed_extension list
        :param filename:
        :param allowed_extensions:
        :return:
        """
        extension = cls.get_file_extension(filename)
        if extension in allowed_extensions:
            return True
        return False

    @classmethod
    def get_name_for_saving(cls, file):
        """
        Gets checksum of byte-sequence like object and extension from file name.
        Interpolates those value in a new string
        :param file: bytes-sequence object with determined filename parameter
        :return: name of a file ready for saving
        """
        file_check_sum = f'{cls.get_file_checksum(file)}'
        file_extension = cls.get_file_extension(file.filename)
        return f'{file_check_sum}.{file_extension}'

    @classmethod
    def get_serialized_file_name(cls, file_full_name):
        """
        Returns file name for serialized object
        :param file_full_name: name of original file
        :return: original file name with exchanged extension
        """
        file_name = cls.get_file_name(file_full_name)
        return f'{file_name}.pkl'

    @classmethod
    def get_file_checksum(cls, file):
        """
        Gets file checksum
        :param file: sequence of bytes object with read() method
        :return:
        """
        hash_md5 = md5()
        for chunk in iter(lambda: file.read(4096), b""):
            hash_md5.update(chunk)
        return hash_md5.hexdigest()
