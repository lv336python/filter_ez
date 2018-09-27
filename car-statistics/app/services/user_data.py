"""
Service to perform file upload
"""
import os

from app import db
from app.models.files import File, Dataset
from app.services.utils import create_dir, user_dir,  save_path, attributes, serialize


def rewrite_file(file, file_path):
    """
    :param file:
    :param file_path:
    :return:
    """
    file.save(file_path)  # saving file to filesystem rewrites file which exist
    file_attr = attributes(file_path)  # getting attributes from file
    upd_file = File.query.filter_by(path=file_path).first()  # getting file data from DB to be updated
    upd_file.attributes = {"loaded": "Updated"}  # updating record in DB
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
        return rewrite_file(file, path)

    # filesystem manipulation
    create_dir(upload_dir)  # creates directory recursively if not exist
    file.save(path)  # saving file to filesystem
    file_attr = attributes(path)  # getting attributes from file

    # db manipulation
    new_file = File(path=os.path.basename(path), attributes=file_attr)  # adding uploaded File to DB
    db.session.add(new_file)
    db.session.flush()
    new_dataset = Dataset(user_id=user_id, file_id=new_file.id)  # adding empty DataSet to DB
    db.session.add(new_dataset)
    db.session.commit()

    serialize(path)
    return 'Uploaded', new_file.id, new_dataset.id
