"""
Module for filtering files
"""
import os

from flask import request, jsonify, session
from flask_login import login_required

import pandas as pd

from app import APP
from app.helper import FileManager, DataBaseManager, Status
from app.services.file_data import fields_definition
from app.services.filtration_service import FilterApplier


@login_required
@APP.route('/api/apply_filer', methods=['POST'])
def apply_filter():
    """
    Saving filter and dataset, based on filter parameters
    :return: response with status 200 or 401
    """
    user_id = int(session['user_id'])

    data = request.get_json()
    parameters = data['params']
    name = data['name']
    file_id = data['file_id']

    filter_id = DataBaseManager.add_filter(name, parameters).id
    dataset_id = DataBaseManager.get_datasets_by_file(file_id).first().id

    filter_applier = FilterApplier(dataset_id, filter_id)
    included_rows = filter_applier.filter_apply()

    DataBaseManager.add_dataset(user_id=user_id, file_id=file_id, filter_id=filter_id,
                                included_rows=included_rows)

    return jsonify({'success': 'filter was successfully saved'}), \
        Status.HTTP_200_OK


@login_required
@APP.route('/api/save_filter', methods=['POST'])
def save_filter():
    """
    Save filter to database(for further editing) without applying it to file
    :return: response with status 200 or 401
    """
    user_id = int(session['user_id'])

    data = request.get_json()
    parameters = data['params']
    name = data['name']
    file_id = data['file_id']

    filter_id = DataBaseManager.add_filter(name, parameters).id

    DataBaseManager.add_dataset(file_id=file_id, user_id=user_id, filter_id=filter_id)

    return jsonify({'success': 'filter was successfully saved'}),\
        Status.HTTP_200_OK


@login_required
@APP.route('/api/get_metadata/<file_id>', methods=['POST'])
def get_metadata(file_id):
    """
    Getting metadata: list of column and values for file
     :return: Response with metadata
    """
    file = DataBaseManager.get_file_by_id(file_id)
    file_path = os.path.join(APP.config['UPLOAD_FOLDER'],
                             FileManager.get_serialized_file_name(file.path))

    metadata = fields_definition(file_path)
    count_rows = pd.read_pickle(file_path).shape[0]
    result = {'rows': count_rows, 'metadata': metadata}
    return jsonify(result), \
        Status.HTTP_200_OK


@login_required
@APP.route('/api/count_rows', methods=['POST'])
def count_filtered_rows():
    """
        Getting number of rows applying filter_params
        :return: Response number rows
    """
    data = request.get_json()
    params = data['params']
    file_id = data['file_id']

    file = DataBaseManager.get_file_by_id(file_id)
    file_path = os.path.join(APP.config['UPLOAD_FOLDER'],
                             FileManager.get_serialized_file_name(file.path))

    xl_file = pd.read_pickle(file_path)

    if isinstance(params, (list, tuple)):
        for elem in params:
            if 'quantity' in elem:
                xl_file = xl_file[mask_f(xl_file, elem)]
            else:
                xl_file = xl_file[mask_f(xl_file, elem)]
    else:
        if 'quantity' in params:
            xl_file = xl_file[mask_f(xl_file, params)]
        else:
            xl_file = xl_file[mask_f(xl_file, params)]

    return jsonify(xl_file.shape[0]),\
        Status.HTTP_200_OK


def mask_f(data_frame, params):
    """
        Return criteria for data_frame depends on operator between column and value
    :param data_frame:
    :param params:
    :return: criteria value
    """
    column = params['column']
    operator = params['operator']
    value = params['value']
    if operator == '==':
        criteria = (data_frame[column] == value)
    elif operator == '!=':
        criteria = (data_frame[column] != value)
    elif operator == '>':
        criteria = (data_frame[column] > value)
    elif operator == '<':
        criteria = (data_frame[column] < value)
    elif operator == 'range':
        criteria = ((value['from'] <= data_frame[column]) & (data_frame[column] <= value['to']))
    else:
        criteria = 'error'

    return criteria
