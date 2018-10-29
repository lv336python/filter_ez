"""
    Module for routes for requiring data for uploaded excel file like statistics
    or first n rows of file for a preview
"""

import json

from flask import session
from flask_login import login_required

from app import APP
from app.services import file_data
from app.models import Dataset


@APP.route('/api/statistics/<int:dataset_id>', methods=["GET"])
@login_required
def get_statistics(dataset_id):
    """
    Returns json with statistics information about the file. This json contains
    rate of occurrences for each value of each column.
    :param dataset_id: id of data set
    :return: json with data about how many records there are of each value for each column
    """
    dataset = Dataset.query.get(dataset_id)
    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != int(session['user_id']):
        return json.dumps({'message': 'access forbidden'}), 403

    file_data.fields_statistics(dataset, non_blocking=True)

    return json.dumps({'message': 'request successful, processing'}), 202


@APP.route('/api/get_rows/<int:dataset_id>/<int:number_of_rows>', methods=["GET"])
@login_required
def get_rows(dataset_id, number_of_rows):
    """
    Returns first n rows of file
    :param dataset_id: Id of dataset to get first rows
    :param number_of_rows: amount of rows to return
    :return: json with names of columns and first n rows of the table (list of lists)
    """
    dataset = Dataset.query.get(dataset_id)

    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != int(session['user_id']):
        return json.dumps({'message': 'access forbidden'}), 403

    number_of_rows = number_of_rows if 5 < number_of_rows < 100 else 10

    preview = file_data.get_data_preview(dataset, number_of_rows)
    return json.dumps(preview), 200
