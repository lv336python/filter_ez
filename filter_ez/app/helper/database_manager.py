"""
This module contains class DataBaseManager which aggregates all the
functionality needed to work with database.
"""
from app.models.user import User
from app.models.files import File, Dataset, Filter
from app import db


class DataBaseManager:
    """
    Class for working with database. It provides all necessary functionality
    to work with database
    """
    @classmethod
    def get_user_by_id(cls, user_id):
        """
        Method for getting user by id
        :param user_id:
        :return: user record
        """
        user = User.query.get(user_id)
        return user

    @classmethod
    def get_user_by_email(cls, email):
        """
        Method for getting user by email
        :param email:
        :return: user record
        """
        user = User.query.filter(User.email == email).first()
        return user

    @classmethod
    def get_dataset_by_id(cls, dataset_id):
        """
        Method for getting dataset by id
        :param dataset_id:
        :return: dataset record
        """
        dataset = Dataset.query.filter(Dataset.id == dataset_id).first()
        return dataset

    @classmethod
    def get_last_dataset(cls):
        """
        Method for getting last dataset
        :return: dataset
        """
        dataset = Dataset.query.all()[-1]
        return dataset

    @classmethod
    def get_dataset_id(cls, file_id):
        """
        Method for getting dataset id by file_id
        :param file_id:
        :return: dataset id
        """
        dataset_id = Dataset.query.filter(Dataset.file_id == file_id).first().id
        return dataset_id

    @classmethod
    def get_file_by_id(cls, file_id):
        """
        Method for getting file by id
        :param file_id:
        :return: file record
        """
        file = File.query.get(file_id)
        return file

    @classmethod
    def create_user(cls, email, password):
        """
        Method for creating user
        :param email:
        :param password:
        :return: user
        """
        user = User.create(email, password)
        return user

    @classmethod
    def get_subsets_by_filter(cls, file_id):
        """
        Method for getting subsets by file id and and included rows
        :param file_id:
        :return: subsets
        """
        subsets = Dataset.query.filter_by(
            file_id=file_id).filter(Dataset.included_rows is not None).all()
        return subsets

    @classmethod
    def getting_params_for_filtering(cls, filter_id):
        """
        Method for getting paramaters for filtering by filter_id
        :param filter_id:
        :return: filters (paramaters for filering)
        """
        filters = Filter.query.get(filter_id).params
        return filters

    @classmethod
    def getting_filedata_to_be_updated(cls, name):
        """
        Method for getting filedata to be updated by name
        :param name:
        :return:
        """
        upd_file = File.query.filter_by(path=name).first()
        return upd_file

    @classmethod
    def get_subsets_by_id(cls, file_id):
        """
        Method for getting subsets by file id
        :param file_id:
        :return: subsets
        """
        subsets = Dataset.query.filter_by(file_id=file_id).all()
        return subsets

    @classmethod
    def add_record_to_db(cls, obj):
        """
        Method for add record to database
        :param obj:
        """
        db.session.add(obj)
        db.session.commit()

    @classmethod
    def delete_record_from_db(cls, obj):
        """
        Method for delete record from db
        :param obj:
        :return:
        """
        db.session.delete(obj)
        db.session.commit()

    @classmethod
    def flush(cls):
        """
        Method for communicate a series of operations to the database
        """
        db.session.flush()
