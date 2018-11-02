'''
Module for datasets services
'''
from app import DB
from app.models import Dataset
from app.services.new_filtration_service import FilterApplier


def save_dataset(file_id, user_id, filter_id, apply=False):
    '''
    Save dataset to DB (without include rows)
    :param file_id: id of file
    :param user_id: id current user
    :param filter_id: id of filter
    :return:
    '''

    if apply:
        dataset = Dataset.query.filter(Dataset.file_id == file_id).first()
        filter_applier = FilterApplier(filter_id=filter_id, dataset_id=dataset.id)
        included_rows = [item for item in filter_applier.filter_apply()]
        new_dataset = Dataset(user_id=user_id, filter_id=filter_id,
                              included_rows=included_rows, file_id=file_id)

    else:
        new_dataset = Dataset(user_id=user_id, filter_id=filter_id, file_id=file_id)
    DB.session.add(new_dataset)
    DB.session.commit()
    return new_dataset.id
