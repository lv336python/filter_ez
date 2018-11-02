"""
This module contains class DataBaseManager which aggregates all the
functionality needed to work with database.
"""
from app.models.user import User
from app.models.files import File, Dataset, Filter
from app import DB


class DataBaseManager:
    """
    Class for working with database. It provides all necessary functionality
    to work with databasedb
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
        DB.session.add(obj)
        DB.session.commit()

    @classmethod
    def delete_record_from_db(cls, obj):
        """
        Method for delete record from db
        :param obj:
        :return:
        """
        DB.session.delete(obj)
        DB.session.commit()

    @classmethod
    def flush(cls):
        """
        Method for communicate a series of operations to the database
        """
        DB.session.flush()

    @classmethod
    def get_file_by_name(cls, name):
        """
        Returns file object by path to file (name of file)
        :param name: str
        :return: File or None
        """
        return File.query.filter(File.path == name).first()

    @classmethod
    def get_datasets_by_user_and_file(cls, user_id, file_id):
        """
        Returns dataset object by name of file and user it binds
        :param user_id: id of a user
        :param file_id: id of a file
        :return: Dataset object or None
        """
        return Dataset.query.filter(DB.and_(Dataset.file_id == file_id,
                                            Dataset.user_id == user_id))

    @classmethod
    def get_datasets_by_file(cls, file_id):
        """
        Returns dataset object by id of a file
        :param file_id: id of a file
        :return: Dataset or None
        """
        return Dataset.query.filter(Dataset.file_id == file_id)

    @classmethod
    def add_file(cls, file_name, attributes):
        """
        Adds file with given fields to database
        :param file_name: string
        :param attributes: json
        :return: file object
        """
        file = File(file_name, attributes)
        DB.session.add(file)
        DB.session.commit()
        return file

    @classmethod
    def add_dataset(cls, user_id, file_id, filter_id=None, included_rows=None):
        """
        Adds dataset with given fields to database
        :param user_id: int
        :param file_id: int
        :param filter_id: int
        :param included_rows: list of ids of rows that must be included
        :return: dataset object
        """
        dataset = Dataset(file_id, user_id, filter_id=filter_id, included_rows=included_rows)
        DB.session.add(dataset)
        DB.session.commit()
        return dataset
