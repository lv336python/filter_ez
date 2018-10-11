"""
    Module for with routes for downloading users files
"""
import json

from flask import send_file, session
from flask_login import login_required
from app import app, logger
from app.models import Dataset
from app.services import utils, notify_admin, send_result_to_mail


@app.route("/api/download/<int:dataset_id>", methods=['GET'])
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
    dataset = Dataset.query.filter(Dataset.id == int(dataset_id)).first()

    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != user_id:
        return json.dumps({'message': 'access forbidden'}), 403

    if not dataset.filter_id:
        return send_file(utils.get_user_file(dataset.file_id, dataset.user_id))

    file_data = utils.dataset_to_excel(dataset)  # Creates BytesIO objects with dataset
    if file_data:
        logger.info(f"User %s successfully downloaded dataset %s", user_id, dataset_id)
        return send_file(file_data,
                         attachment_filename='result.xlsx',
                         as_attachment=True,
                         mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                         )
    logger.error(f"error when user %s downloaded %s", user_id, dataset_id)
    notify_admin(error_level="ERROR",
                 message=f"Unexpected error occurred when user {user_id} tried to download"
                         f" dataset {dataset_id}")
    return json.dumps({'message': 'couldn\'t send file to user'}), 500


@app.route('/test')
def test():
    """
    Sends latest dataset on the mail invoking celery worker to send a notification
    :return:
    """
    dataset = Dataset.query.all()[-1]
    send_result_to_mail(['vovapetryna1995@gmail.com'],
                        'result.xls',
                        open(utils.get_user_file(dataset.file_id, dataset.user_id), 'rb').read())
    return json.dumps({'data': 'Email has been sent'})
