"""
    Module with routes for managing files and datasets
"""
import os

from flask import send_file, session, request, jsonify
from flask_login import login_required

from app import APP
from app.services.utils import dataset_to_excel
from app.helper import UsersDataset, DataBaseManager, Status, FileManager
from app.services.user_data_collection import UserDataCollector


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
        return jsonify({'message': 'file does not exist'}), \
               Status.HTTP_404_NOT_FOUND

    dataset = UsersDataset(dataset_id)

    if not dataset.is_owner(user_id):
        return jsonify({'message': 'access forbidden'}), \
               Status.HTTP_403_FORBIDDEN

    if dataset.is_dataset():
        file_data = dataset_to_excel(dataset)  # Creates BytesIO objects with dataset
    else:
        file = DataBaseManager.get_file_by_id(dataset.file_id)
        file_data = os.path.join(APP.config['UPLOAD_FOLDER'], file.path)

    return send_file(file_data,
                     attachment_filename='result.xlsx',
                     as_attachment=True,
                     mimetype="application/vnd.ms-excel"
                     )


@APP.route('/api/upload', methods=['POST'])
@login_required
def upload():
    """
    Adds file and appropriate dataset to database and saves file in local storage.
    Uses FileManager for saving file and DatabaseManager for writing changes to database
    :return: response with codes:
            400 - no file in request
            415 - file has incorrect extension (must be .xls, .xlsx, .csv)
            422 - file is correct but first column is not unique values
            201 - OK file is uploaded - json with file and dataset data
    """
    if request.files and request.files.get('upload_file'):
        file = request.files['upload_file']
        file_manager = FileManager(APP.config['UPLOAD_FOLDER'])

        if file_manager.validate_file_extension(file.filename):
            attributes = file_manager.upload_file(file)

            if not attributes:
                return jsonify({'error': 'first column not unique values'}), \
                       Status.HTTP_422_UNPROCESSABLE_ENTITY

            user_id = int(session['user_id'])

            db_file = DataBaseManager.get_file_by_name(attributes['saved_name'])
            if not db_file:
                db_file = DataBaseManager.add_file(attributes['saved_name'], attributes)

            db_dataset = DataBaseManager.get_datasets_by_user_and_file(user_id, db_file.id).first()
            if not db_dataset:
                db_dataset = DataBaseManager.add_dataset(user_id, db_file.id)

            response = {
                'file': {
                    'id': db_file.id,
                    'name': attributes['name'],
                    'size': attributes['size'],
                    'rows': attributes['rows']
                },
                'dataset_id': db_dataset.id
            }

        else:
            return jsonify({'error': 'bad file type'}), \
                   Status.HTTP_415_UNSUPPORTED_MEDIA_TYPE

        return jsonify(response), \
               Status.HTTP_201_CREATED
    else:
        return jsonify({'error': 'no file, empty form'}), \
               Status.HTTP_400_BAD_REQUEST


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

    datasets = DataBaseManager.get_datasets_by_user_and_file(user_id, file_id)

    if not datasets:
        return jsonify({"message": 'such file does not exist'}), \
               Status.HTTP_404_NOT_FOUND

    file = DataBaseManager.get_file_by_id(file_id)

    for dataset in datasets:
        DataBaseManager.delete_record_from_db(dataset)

    datasets = DataBaseManager.get_datasets_by_file(file_id).first()

    if datasets:
        file_manager = FileManager(APP.config['UPLOAD_FOLDER'])
        file_manager.delete_file(file.path)
        DataBaseManager.delete_record_from_db(file)

    return jsonify({"message": "file deleted"}), \
           Status.HTTP_200_OK


@APP.route('/api/get_files', methods=['POST'])
@login_required
def getfiles():
    """
    Retrieves list of user files
    :return: list of dicts:public
        [{
            'id': int
            'name': int
            'size': int
            'nRows': int
            'datasetId': int
        }, ...]
    """
    files = UserDataCollector(int(session['user_id']))
    return jsonify(files.get_files_info()), \
           Status.HTTP_200_OK


@APP.route('/api/delete_dataset/<int:dataset_id>')
@login_required
def delete_dataset(dataset_id):
    '''
    Delete dataset from DB
    :param dataset_id: dataset id
    :return: response with codes:
             404 - such dataset doesn't exist
             200 - dataset was
    '''
    user_id = int(session['user_id'])

    dataset = DataBaseManager.get_dataset_by_id(dataset_id)
    if not dataset:
        return jsonify({
            'message': 'dataset was not found'
        }), Status.HTTP_404_NOT_FOUND
    if not dataset.user_id == user_id:
        return jsonify({
            'message': ' forbidden'
        }), Status.HTTP_403_FORBIDDEN
    new_filter = DataBaseManager.get_filter_by_id(dataset.filter_id)
    DataBaseManager.delete_record_from_db(dataset)
    DataBaseManager.delete_record_from_db(new_filter)
    return jsonify({
        'message': 'dataset and filter  was deleted'
    }), Status.HTTP_200_OK


@APP.route('/api/delete_filter/<int:filter_id>')
@login_required
def delete_filter(filter_id):
    '''
    Delete filter from database

    :param filter_id: filter id
    :return: response with codes:
             404 - such filter doesn't exist
             403 - you can`t delete filter because datasets are linked with it
             202 - dataset was deleted
    '''
    user_id = int(session['user_id'])

    new_filter = DataBaseManager.get_filter_by_id(filter_id)
    if not new_filter:
        return jsonify({
            'message': 'there is no such filter'
        }), Status.HTTP_404_NOT_FOUND

    datasets = DataBaseManager.get_datasets_by_filter(filter_id)

    for dataset in datasets:
        if not dataset.user_id == user_id:
            return jsonify({
                'message': 'forbidden'
            }), Status.HTTP_403_FORBIDDEN
        if dataset.included_rows:
            return jsonify({
                'message': 'there are datasets that depended on this filter'
            }), Status.HTTP_403_FORBIDDEN
    for dataset in datasets:
        DataBaseManager.delete_record_from_db(dataset)
    DataBaseManager.delete_record_from_db(new_filter)

    return jsonify({
        'message': 'filter was deleted'
    }), Status.HTTP_202_ACCEPTED
