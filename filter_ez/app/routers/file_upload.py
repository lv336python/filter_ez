"""
TODO
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
    TODO
    :return:
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

            db_dataset = DataBaseManager.get_dataset_by_user_and_file(user_id, db_file.id)
            if not db_dataset:
                db_dataset = DataBaseManager.add_dataset(int(session.get('user_id')), db_file.id)

            response = {
                'file': {
                    'id': db_file.id,
                    'name': db_file.path,
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
    TODO
    :return:
    """
    files = UserDataCollector(int(session['user_id']))
    return make_response(jsonify(files.get_files_info()), 200)
