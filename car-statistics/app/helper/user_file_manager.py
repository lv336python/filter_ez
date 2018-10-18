"""
This module contains class UserFilesManager which aggregates all the
functionality needed to work with user files in local storage: saving, deleting,
fetching, etc.
"""
import os
from datetime import datetime
from hashlib import md5

import pandas as pd

from app import app, db, logger
from app.models import Dataset, File  # Remove when DBM is ready


class UserFilesManager:
    """
    Class for working with local user files. It provides all necessary functionality
    to work with files of a given user
    """
    def __init__(self, user_id):
        self.user_id = user_id
        self.files_dir = os.path.join(app.config['UPLOAD_FOLDER'], str(user_id))

        os.makedirs(self.files_dir, exist_ok=True)

        self.files = set()
        for dataset in Dataset.query.filter(Dataset.user_id == self.user_id):
            file = File.query.filter(File.id == dataset.id).first()
            if file:
                self.files.add(file.path)

    def upload_file(self, file):
        """
        Accepts FileStorage object
        Saves original uploaded file and serialized DataFrame for this file.
        Creates records in database
        :param file: FileStorage
        :return: IDs of created data set and file
        """
        # Get check sum of file
        hashed_file_name = f'{self.get_file_checksum(file)}'

        # Change file name and save it under this name
        file_extension = self.get_file_extension(file.filename)
        file_full_name = f'{hashed_file_name}.{file_extension}'
        file_path = os.path.join(self.files_dir, file_full_name)

        # Send existing file instead of uploading a new one
        if file_full_name in self.files:
            _file = File.query.filter(File.path == file_full_name).first()
            _dataset = Dataset.query.filter(Dataset.file_id == _file.id).first()
            logger.info('User {0} uploaded which already existed under id {1}'
                        .format(self.user_id, _file.id))
            return 'Uploaded', _file.id, _dataset.id

        file.seek(0)
        file.save(file_path)

        # Serialize uploaded file as DataFrame (Update when DataFrame interface is ready)
        shape = self.serialize(file_full_name)

        # Get attributes of file
        file_attributes = self.get_attributes(file_path)
        file_attributes['name'] = file.filename
        file_attributes['rows'] = shape[0]
        file_attributes['cols'] = shape[1]

        # Save to db, update when dbm is ready
        new_file = File(path=file_full_name, attributes=file_attributes)
        db.session.add(new_file)
        db.session.flush()
        new_dataset = Dataset(user_id=self.user_id, file_id=new_file.id)
        db.session.add(new_dataset)
        db.session.commit()
        logger.info('User {0} uploaded a new file {1}'.format(self.user_id, new_file.id))
        return 'Uploaded', new_file.id, new_dataset.id

    def serialize(self, file_full_name):
        """
        Serializes DataFrame extracted from .xls file.
        Create serialized DataFrame in the same directory where given file exist
        Serialized file has the same name but another extension.
        To get this file instead excel file use function serialized_file()
        :param file_full_name: name of the file with extension
        :return: shape of DataFrame
        """
        file_name = self.get_file_name(file_full_name)
        df_to_serialize = pd.read_excel(os.path.join(self.files_dir, file_full_name))
        serialized_file_name = f'{file_name}.pkl'
        df_to_serialize.to_pickle(os.path.join(self.files_dir, serialized_file_name))

        shape = df_to_serialize.shape
        return shape

    def get_user_file_name(self, file_id):
        """
        Returns name of the stored file with the given file_id if this file belongs to the User
        :param file_id:
        :return: path to file or None
        """
        file = File.query.get(file_id)
        return file.path if file in self.files else None

    def get_file_path(self, file_id):
        """
        Returns path to original file with the given file_id if this file belongs to the User
        :param file_id:
        :return: path to file or None
        """
        file_name = self.get_user_file_name(file_id)
        if file_name:
            return os.path.join(self.files_dir, file_name)
        return None

    def get_serialized_file_path(self, file_id):
        """
        Returns path to serialized file with the given file_id if this file belongs to the User
        :param file_id:
        :return: path to file or None
        """
        file_full_name = self.get_user_file_name(file_id)
        if file_full_name:
            file_name = self.get_file_name(file_full_name)
            return os.path.join(self.files_dir, f'{file_name}.pkl')
        return None

    @classmethod
    def get_attributes(cls, file_path):
        """
        Retrieves information about the file placed on the given file_path.
        :param file_path: path to file
        :return: dictionary with file attributes
        """
        attributes = dict()
        attributes['name'] = os.path.basename(file_path)
        attributes['size'] = round(os.path.getsize(file_path), 2)
        attributes['date'] = datetime.now().isoformat()
        attributes['modified'] = datetime.fromtimestamp(os.path.getctime(file_path)).isoformat()
        return attributes

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
    def validate_file_extension(cls, file):
        """
        Checks if file extension is one that exists in the allowed_extension list
        :param file:
        :return: True or False
        """
        extension = cls.get_file_extension(file.filename)
        if extension in app.config['ALLOWED_EXTENSIONS']:
            return True
        return False

    @classmethod
    def get_file_checksum(cls, file):
        hash_md5 = md5()
        for chunk in iter(lambda: file.read(4096), b""):
            hash_md5.update(chunk)
        return hash_md5.hexdigest()
