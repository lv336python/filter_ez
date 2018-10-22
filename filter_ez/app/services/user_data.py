"""
Service to perform file upload
"""
import os

from app import db
from app.models.files import File, Dataset
from app.services.utils import create_dir, user_dir,  save_path, attributes, serialize


def rewrite_file(file, path):
    """
    :param file:
    :param path:
    :return:
    """
    file.save(path)  # saving file to filesystem rewrites file which exist
    shape = serialize(path)
    file_attr = attributes(path)  # getting attributes from file
    file_attr['name'] = file.filename
    file_attr['rows'] = shape[0]
    name = os.path.basename(path)
    upd_file = File.query.filter_by(path=name).first()  # getting file data from DB to be updated
    upd_file.attributes = file_attr  # updating record in DB
    db.session.commit()
    return upd_file.id


def upload_file(file, user_id):
    """
    Function adds file to Files table and saves it in users directory
    :param file: object of request.files
    :param user_id: id of User uploading file
    :return: File and DataSet id's
    """

    upload_dir = user_dir(user_id)
    path = save_path(upload_dir, file.filename, user_id)
    if os.path.exists(path):
        file_id = rewrite_file(file, path)
        dataset_id = Dataset.query.filter(Dataset.file_id == file_id).first().id
        return "Updated", file_id, dataset_id

    # filesystem manipulation
    create_dir(upload_dir)  # creates directory recursively if not exist
    file.save(path)  # saving file to filesystem
    shape = serialize(path)
    file_attr = attributes(path)  # getting attributes from file
    file_attr['name'] = file.filename
    file_attr['rows'] = shape[0]
    # db manipulation
    new_file = File(path=os.path.basename(path), attributes=file_attr)  # adding uploaded File to DB
    db.session.add(new_file)
    db.session.flush()
    new_dataset = Dataset(user_id=user_id, file_id=new_file.id)  # adding empty DataSet to DB
    db.session.add(new_dataset)
    db.session.commit()

    return 'Uploaded', new_file.id, new_dataset.id
