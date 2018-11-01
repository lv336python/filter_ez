"""
TODO
"""
import json

from flask import session
from flask_login import login_required
from flask_api import status

from app import APP
from app.helper import FileManager, DataBaseManager


@APP.route('/api/delete_file/<int:file_id>')
@login_required
def delete_file(file_id):
    """
    Delete user files from DB and folder
    :param file_id:
    :return: None
    """
    user_id = int(session['user_id'])
    file_manager = FileManager(APP.config['UPLOAD_FOLDER'])

    dataset = DataBaseManager.get_dataset_by_user_and_file(user_id, file_id)

    if not dataset:
        json.dumps({"message": 'such file does not exist'})

    file = DataBaseManager.get_file_by_id(file_id)
    datasets = DataBaseManager.get_datasets_by_file(file_id)

    if datasets.count() == 1:
        file_manager.delete_file(file.path)
        DataBaseManager.delete_record_from_db(file)

    DataBaseManager.delete_record_from_db(dataset)

    return json.dumps({"message": "file deleted"}), status.HTTP_200_OK
