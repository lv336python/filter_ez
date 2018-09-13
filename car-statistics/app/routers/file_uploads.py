import os

from app import app
from flask import render_template, request, jsonify, make_response
from app.services.file_upload import file_uploader
from app.utils import file_extension
from app.validators import validate_file_ext


# todo: upload process bar


@app.route('/upload')
def upload_file():
    return render_template('upload.html')


@app.route('/api/uploader', methods=['POST'])
def uploader():
    if request.method == 'POST':
        if request.files and request.files.get('uploaded_file'):
            # add validation
            file = request.files['uploaded_file']
            suffix = file_extension(file.filename)
            if validate_file_ext(suffix):
                res = file_uploader(file)
            return make_response(jsonify({'res': res}), 201)
        else:
            return make_response(jsonify({'error': 'bad file type'}), 400)
