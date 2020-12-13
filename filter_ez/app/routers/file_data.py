"""
    Module for routes for requiring data for uploaded excel file like statistics
    or first n rows of file for a preview
"""
from flask import session, jsonify
from flask_login import login_required

from app import APP
from app.helper import Status
from app.services import file_data
from app.models import Dataset


@APP.route('/api/statistics/<int:dataset_id>', methods=["GET"])
@login_required
def get_statistics(dataset_id):
    """
    Gives worker job to create json with statistics and send it via socket
    Returns json with 'message' key and some message value
    :param dataset_id: id of data set
    :return: response with codes:
             404 - no dataset with such id
             403 - given dataset doesn't belong to user
             202 - request accepted and job is added to queue, so worker will take it
    """
    dataset = Dataset.query.get(dataset_id)
    if not dataset:
        return jsonify({'message': 'file does not exist'}), \
               Status.HTTP_404_NOT_FOUND

    if dataset.user_id != int(session['user_id']):
        return jsonify({'message': 'access forbidden'}), \
               Status.HTTP_403_FORBIDDEN

    file_data.fields_statistics(dataset, non_blocking=True)

    return jsonify({'message': 'request successful, processing'}), \
           Status.HTTP_202_ACCEPTED


@APP.route('/api/get_rows/<int:dataset_id>/<int:number_of_rows>', methods=["GET"])
@login_required
def get_rows(dataset_id, number_of_rows):
    """
    Returns first n rows of file
    :param dataset_id: Id of dataset to get first rows
    :param number_of_rows: amount of rows to return
    :return: response with codes:
             404 - no dataset with such id
             403 - given dataset doesn't belong to user
             200 - json with data preview:
         {
            'columns' : ['col1', 'col2', ...],
            'rows' : [
                ['val11', 'val12', ...],
                ['val21', 'val22', ...],
                ...
            ]
         }
    """
    dataset = Dataset.query.get(dataset_id)

    if not dataset:
        return jsonify({'message': 'file does not exist'}), 404

    if dataset.user_id != int(session['user_id']):
        return jsonify({'message': 'access forbidden'}), 403

    preview = file_data.get_data_preview(dataset, number_of_rows)
    return jsonify(preview), 200
