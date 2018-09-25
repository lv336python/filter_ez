from app import app
from flask import request, jsonify, make_response, session

from flask_login import login_required

from app.services.user_data import upload_file
from app.services.utils import file_ext
from app.validators import validate_file_ext


@app.route('/api/upload', methods=['POST'])
@login_required
def uploader():
    if request.files and request.files.get('upload_file'):  # checking if file is added to form
        user_id = session.get('user_id')  # getting id of User which is logged in
        file = request.files['upload_file']  # extracting file from the request
        suffix = file_ext(file.filename)  # file extension by suffix

        if validate_file_ext(suffix):  # validation for allowed extensions
            result = upload_file(file, user_id)  # processing upload by upload function from services
        else:
            return make_response(jsonify({'error': 'bad file type'}), 400)

        return make_response(jsonify({'result': result}), 201)

    else:
        return make_response(jsonify({'error': 'no file, empty form'}), 400)
