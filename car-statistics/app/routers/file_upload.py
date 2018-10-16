from app import app
from flask import request, jsonify, make_response, session

from flask_login import login_required

from app.helper import UserFilesManager
from app.models import File


@app.route('/api/upload', methods=['POST'])
@login_required
def uploader():
    if request.files and request.files.get('upload_file'):  # checking if file is added to form
        user_id = session.get('user_id')  # getting id of User which is logged in
        file = request.files['upload_file']  # extracting file from the request

        file_manager = UserFilesManager(user_id)

        if file_manager.validate_file_extension(file):
            result = file_manager.upload_file(file)  # processing upload by upload function from services
        else:
            return make_response(jsonify({'error': 'bad file type'}), 400)

        return make_response(jsonify({'result': result}), 201)

    else:
        return make_response(jsonify({'error': 'no file, empty form'}), 400)


@app.route('/api/get_files', methods=['POST'])
def getfiles():
    files = [[i.id, i.path, i.attributes] for i in File.query.all()]
    return make_response(jsonify(files), 200)

