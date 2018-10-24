"""
    Module for with routes for downloading users files
"""
import json

from flask import send_file, session
from flask_login import login_required
from app import APP, LOGGER
from app.models import Dataset
from app.services import utils, notify_admin
from app.helper import UserFilesManager


@APP.route("/api/download/<int:dataset_id>", methods=['GET'])
@login_required
def download(dataset_id):
    """
    Returns xls file. If dataset.filter_id is equal to None, returns original file
    else read DataFrame from it and removes all rows which are in dataset.included_rows
    and then writes changed DataFrame to ByteIO object which is sent as a file
    :param dataset_id: id of dataset to return for download
    :return: File or JSON with error
    """
    user_id = int(session.get('user_id', 0))
    dataset = Dataset.query.get(dataset_id)

    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != user_id:
        return json.dumps({'message': 'access forbidden'}), 403

    file_manager = UserFilesManager(user_id)

    if not dataset.filter_id:
        return send_file(file_manager.get_file_path(dataset.file_id),
                         attachment_filename='result.xlsx',
                         as_attachment=True,
                         mimetype="application/vnd.ms-excel"
                         )

    file_data = utils.dataset_to_excel(dataset)  # Creates BytesIO objects with dataset
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
    return json.dumps({'message': 'couldn\'t send file to user'}), 500
