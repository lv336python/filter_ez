"""Module including Dataset Class"""
import pickle

from app.helper import UserFilesManager as Ufm
from app.helper import DataSetPandas as Dataframe
from app.models import Dataset


class DatasetManager:
    def __init__(self, dataset_id):
        self.id = dataset_id
        self.file_id = self.get_dataset().file_id
        self.user_id = self.get_dataset().user_id
        self.filter_id = self.get_dataset().filter_id
        self.included_rows = self.get_dataset().included_rows

    def get_dataset(self):
        return Dataset.query.get(self.id)

    def is_dataset(self):
        return bool(self.filter_id)

    def is_owner(self, user_id):
        return self.user_id == user_id

    def to_dataframe(self):
        file = Ufm(self.user_id)
        data = Dataframe()
        file_data = data.read(file.get_serialized_file_path(self.file_id))

        if self.included_rows:
            return data.from_rows(self.included_rows)

        return file_data

    def apply_filter(self):
        pass

    def delete(self):
        pass

    def append(self, indexes):
        return self.included_rows.append(indexes)

    def remove(self, indexes):
        return [
            self.included_rows.remove(idx)
            for idx in indexes
            if idx in self.included_rows
        ]
