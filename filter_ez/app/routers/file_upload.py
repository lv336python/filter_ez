"""
    Module with routes for managing files and datasets
"""

from flask import request, jsonify, make_response, session
from flask_login import login_required

from app import APP
from app.helper import FileManager, DataBaseManager, Status
from app.services.user_data_collection import UserDataCollector


@APP.route('/api/upload', methods=['POST'])
@login_required
def uploader():
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
                return make_response(
                    jsonify({'error': 'wrong table structure, first column not unique values'}),
                    Status.HTTP_422_UNPROCESSABLE_ENTITY
                )

            user_id = int(session['user_id'])

            db_file = DataBaseManager.get_file_by_name(attributes['saved_name'])
            if not db_file:
                db_file = DataBaseManager.add_file(attributes['saved_name'], attributes)

            db_dataset = DataBaseManager.get_datasets_by_user_and_file(user_id, db_file.id).first()
            if not db_dataset:
                db_dataset = DataBaseManager.add_dataset(int(session.get('user_id')), db_file.id)

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
            return make_response(jsonify({'error': 'bad file type'}),
                                 Status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        return make_response(jsonify(response),
                             Status.HTTP_201_CREATED)
    else:
        return make_response(jsonify({'error': 'no file, empty form'}),
                             Status.HTTP_400_BAD_REQUEST)


@APP.route('/api/get_files', methods=['POST'])
@login_required
def getfiles():
    """
    Retrieves list of user files
    :return: list of dicts:
        [{
            'id': int
            'name': int
            'size': int
            'nRows': int
            'datasetId': int
        }, ...]
    """
    files = UserDataCollector(int(session['user_id']))
    return make_response(jsonify(files.get_files_info()), 200)
