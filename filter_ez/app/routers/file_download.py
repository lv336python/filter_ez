"""
    Module for with routes for downloading users files
"""
import json
import os

from flask import send_file, session
from flask_login import login_required
from app import APP, LOGGER
from app.services import utils, notify_admin
from app.helper import UsersDataset, DataBaseManager, Status


@APP.route("/api/download/<int:dataset_id>", methods=['GET'])
@login_required
def download(dataset_id):
    """
    Returns xlsx file. If dataset.filter_id is equal to None, returns original file
    else read DataFrame from it and removes all rows which are in dataset.included_rows
    and then writes changed DataFrame to ByteIO object which is sent as a file
    :param dataset_id: id of dataset to return for download
    :return: response with codes:
             404 - no dataset with such id
             403 - dataset doesn't relate to this user
             500 - internal error (more likely with dataset_to_excel)
            or file object with MIME vnd.ms-excel
    """
    user_id = int(session.get('user_id', 0))

    if not DataBaseManager.get_dataset_by_id(dataset_id):
        return json.dumps({'message': 'file does not exist'}),\
               Status.HTTP_404_NOT_FOUND

    dataset = UsersDataset(dataset_id)

    if not dataset.is_owner(user_id):
        return json.dumps({'message': 'access forbidden'}), \
               Status.HTTP_403_FORBIDDEN

    if dataset.is_dataset():
        file_data = utils.dataset_to_excel(dataset)  # Creates BytesIO objects with dataset
    else:
        file = DataBaseManager.get_file_by_id(dataset.file_id)
        file_data = os.path.join(APP.config['UPLOAD_FOLDER'], file.path)

    if file_data:
        LOGGER.info(f"User %s successfully downloaded dataset %s", user_id, dataset_id)
        return send_file(file_data,
                         attachment_filename='result.xlsx',
                         as_attachment=True,
                         mimetype="application/vnd.ms-excel"
                         )
    LOGGER.error(f"error when user %s downloaded %s", user_id, dataset_id)
    notify_admin(error_level="ERROR",
                 message=f"Unexpected error occurred when user {user_id} tried to download"
                         f" dataset {dataset_id}")
    return json.dumps({'message': 'couldn\'t send file to user'}), \
        Status.HTTP_500_INTERNAL_SERVER_ERROR
