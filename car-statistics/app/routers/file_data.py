"""
    Module for routes for requiring data for uploaded excel file like statistics
    or first n rows of file for a preview
"""

import json

from flask import session
from flask_login import login_required

from app import app
from app.services import utils, file_data
from app.models import Dataset


@app.route('/api/statistics/<dataset_id>', methods=["GET"])
@login_required
def get_statistics(dataset_id):
    """
    Returns json with statistics information about the file. This json contains
    rate of occurrences for each value of each column.
    :param dataset_id: id of data set
    :return:
    """
    user_id = int(session['user_id'])
    dataset = Dataset.query.filter(Dataset.id == dataset_id).first()
    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != user_id:
        return json.dumps({'message': 'access forbidden'}), 403

    file_path = utils.get_user_file(dataset.file_id, user_id)
    statistics = file_data.fields_statistics(file_path)
    return json.dumps(statistics), 200


@app.route('/api/get_rows/<int:dataset_id>/<int:number_of_rows>', methods=["GET"])
@login_required
def get_rows(dataset_id, number_of_rows):
    """
    Returns first n rows of file
    :param dataset_id:
    :param number_of_rows: amount of rows to return
    :return:
    """
    user_id = int(session['user_id'])
    dataset = Dataset.query.filter(Dataset.id == int(dataset_id)).first()
    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != user_id:
        return json.dumps({'message': 'access forbidden'}), 403

    file_path = utils.get_user_file(dataset.file_id, user_id)
    result = file_data.get_data_preview(file_path, number_of_rows)
    return json.dumps(result), 200
