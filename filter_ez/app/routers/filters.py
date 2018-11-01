"""
Module for filtering files
"""
import json
import os

from flask import request, make_response, session
from flask_login import login_required

import pandas as pd

from app import APP
from app.services.file_data import fields_definition
from app.helper import FileManager, DataBaseManager
from app.services.filtering_service import save_filter
from app.services.datasets_services import save_dataset


@APP.route('/api/apply_filer', methods=['POST'])
def filter_save():
    """
    Saving filter and dataset, based on filter parameters
    :return:
    """
    data = json.loads(request.data)
    parameters = data['params']# pylint: disable=unused-variable
    name = data['name']# pylint: disable=unused-variable
    save_filter(filters=parameters, name=name)
    # Call filtration filter(file_id, new_filter.id)

    return make_response(json.dumps({'success': 'filter was successfully saved'}), 200)


@APP.route('/api/save_filter', methods=['POST'])
def filter_saving():
    """
    Save filter to database(for further editing) without applying it to file
    :return: response, status code
    """
    if 'user_id' in session:
        user_id = int(session['user_id'])
    else:
        return json.dumps({'message': 'please login at first'}), 401
    data = json.loads(request.data)
    parameters = data['params']# pylint: disable=unused-variable
    name = data['name']# pylint: disable=unused-variable
    file_id = data['file_id']# pylint: disable=unused-variable
    filter_id = save_filter(filters=parameters, name=name)
    save_dataset(file_id=file_id, user_id=user_id, filter_id=filter_id)

    return make_response(json.dumps({'success': 'filter was successfully saved'}), 200)


@APP.route('/api/get_metadata/<file_id>', methods=['POST'])
@login_required
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
    return make_response(json.dumps(result), 200)


@APP.route('/api/count_rows', methods=['POST'])
@login_required
def filter_num_rows():
    """
        Getting number of rows applying filter_params
        :return: Response number rows
    """
    data = json.loads(request.data)
    params = data['params']
    file_id = data['file_id']

    file = DataBaseManager.get_file_by_id(file_id)
    file_path = os.path.join(APP.config['UPLOAD_FOLDER'],
                             FileManager.get_serialized_file_name(file.path))

    xl_file = pd.read_pickle(file_path)

    if isinstance(params, (list, tuple)):
        for elem in params:
            if 'quantity' in elem:
                xl_file = xl_file[mask_f(xl_file, elem)].head(elem['quantity'])
            else:
                xl_file = xl_file[mask_f(xl_file, elem)]
    else:
        if 'quantity' in params:
            xl_file = xl_file[mask_f(xl_file, params)].head(params['quantity'])
        else:
            xl_file = xl_file[mask_f(xl_file, params)]

    return make_response(json.dumps(xl_file.shape[0]), 200)


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
