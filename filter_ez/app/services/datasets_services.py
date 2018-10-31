from app import DB
from app.models import Dataset


def save_dataset(file_id, user_id, filter_id):
    new_dataset = Dataset(file_id=file_id, user_id= user_id, filter_id=filter_id)
    DB.session.add(new_dataset)
    DB.session.commit()
    return new_dataset.id