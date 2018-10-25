"""
TODO
"""

from flask import request, jsonify, make_response, session
from flask_login import login_required

from app import APP
from app.helper import UserFilesManager
from app.services.user_data_collection import UserDataCollector


@APP.route('/api/upload', methods=['POST'])
@login_required
def uploader():
    """
    TODO
    :return:
    """
    if request.files and request.files.get('upload_file'):
        user_id = session.get('user_id')
        file = request.files['upload_file']

        file_manager = UserFilesManager(user_id)

        if file_manager.validate_file_extension(file):
            result = file_manager.upload_file(file)
        else:
            return make_response(jsonify({'error': 'bad file type'}), 400)

        return make_response(jsonify(result), 201)

    else:
        return make_response(jsonify({'error': 'no file, empty form'}), 400)


@APP.route('/api/get_files', methods=['POST'])
def getfiles():
    """
    TODO
    :return:
    """
    files = UserDataCollector(int(session['user_id']))
    return make_response(jsonify(files.get_files_info()), 200)
