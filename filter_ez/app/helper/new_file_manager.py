"""
Files Manager
"""
import os

from app import APP
from app.models import Dataset, File


class FileManager:
    """
    Files Manager
    """
    def __init__(self, dataset_id):
        self.dataset_id = dataset_id
        self.user_id = self.get()['user_id']
        self.file_id = self.get()['file_id']
        self.path = self.get()['path']
        self.attributes = self.get()['attributes']

    def get(self):
        """
        :return:
        """
        dataset = Dataset.query.get(self.dataset_id)
        file = File.query.get(dataset.file_id)
        return {'user_id': dataset.user_id,
                'file_id': dataset.file_id,
                'path': file.path,
                'attributes': file.attributes}

    def get_file_path(self):
        """
        Returns path to original file with the given file_id if this file belongs to the User
        :param file_id:
        :return: path to file or None
        """
        return os.path.join(APP.config['UPLOAD_FOLDER'], str(self.user_id), self.path)

    def get_serialized_file_path(self):
        """
        Returns path to original file with the given file_id if this file belongs to the User
        :param file_id:
        :return: path to file or None
        """
        file_name = os.path.splitext(self.path)[0]
        serialized = f'{file_name}.pkl'
        return os.path.join(APP.config['UPLOAD_FOLDER'], str(self.user_id), serialized)
