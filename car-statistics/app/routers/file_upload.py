from app import app
from flask import request, jsonify, make_response
from flask_login import login_required

from app.services.user_data import upload_file
from app.services.utils import file_ext
from app.validators import validate_file_ext


@app.route('/api/upload', methods=['POST'])
@login_required
def uploader():
    if request.method == 'POST':
        if request.files and request.files.get('upload_file'):
            file = request.files['upload_file']
            suffix = file_ext(file.filename)
            if validate_file_ext(suffix):
                result = upload_file(file)
            else:
                return make_response(jsonify({'error': 'bad file type'}), 400)

            return make_response(jsonify({'result': result}), 201)

        else:
            return make_response(jsonify({'error': 'no file'}), 400)

    else:
        return make_response(jsonify({'error': 'wrong request method'}), 400)
