"""
    Module with routes for managing files and datasets
"""
import json

from flask import session
from flask_login import login_required

from app import APP
from app.helper import FileManager, DataBaseManager, Status


@APP.route('/api/delete_file/<int:file_id>')
@login_required
def delete_file(file_id):
    """
    Delete user files as a dataset relations from database. If not relations left
    file in local storage is deleted
    :param file_id: id of file to delete
    :return: response with codes:
             404 - such file doesn't exist for this user
             200 - dataset relation for file is deleted for user
    """
    user_id = int(session['user_id'])
    file_manager = FileManager(APP.config['UPLOAD_FOLDER'])

    dataset = DataBaseManager.get_dataset_by_user_and_file(user_id, file_id)

    if not dataset:
        return json.dumps({"message": 'such file does not exist'}), \
               Status.HTTP_404_NOT_FOUND

    file = DataBaseManager.get_file_by_id(file_id)
    datasets = DataBaseManager.get_datasets_by_file(file_id)

    if datasets.count() == 1:
        file_manager.delete_file(file.path)
        DataBaseManager.delete_record_from_db(file)

    DataBaseManager.delete_record_from_db(dataset)

    return json.dumps({"message": "file deleted"}), \
           Status.HTTP_200_OK
