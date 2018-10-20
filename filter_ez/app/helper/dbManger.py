from app.models.user import User
from app.models.files import File, Dataset, Filter
from app import db


class DataBaseManager:

    def get_user_by_id(self, user_id):
        user = User.query.get(user_id)
        return user

    def get_user_by_email(self, email):
        user = User.query.filter(User.email == email).first()
        return user

    def get_dataset_by_id(self, dataset_id):
        dataset = Dataset.query.filter(Dataset.id == dataset_id).first()
        return dataset

    def get_all_datasets(self):
        dataset = Dataset.query.all()[-1]
        return dataset

    def get_dataset_id(self, file_id):
        dataset_id = Dataset.query.filter(Dataset.file_id == file_id).first().id
        return dataset_id

    def get_file_by_id(self, file_id):
        file = File.query.get(file_id)
        return file

    def create_user(self, email, password):
        user = User.create(email, password)
        return user

    def get_subsets_by_filter(self, file_id):
        subsets = Dataset.query.filter_by(file_id=file_id).filter(Dataset.included_rows != None).all()
        return subsets

    def getting_params_for_filtering(self, filter_id):
        filters = Filter.query.get(filter_id).params
        return filters

    def getting_filedata_to_be_updated(self, name):
        upd_file = File.query.filter_by(path=name).first()
        return upd_file

    def get_subsets_by_id(self, file_id):
        subsets = Dataset.query.filter_by(file_id=file_id).all()
        return subsets

    def add_to_db(self, param):
        db.session.add(param)
        db.session.commit()

    def delete_from_db(self, param):
        db.session.delete(param)
        db.session.commit()

    def flush(self):
        db.session.flush()
