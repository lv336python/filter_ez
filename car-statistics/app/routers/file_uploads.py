import os

from app import app
from flask import render_template, request, jsonify, make_response

from app.routers.auth import login
from app.services.user_data import upload_file, delete_file, reload_file, rename_file
from app.utils import file_extension
from app.validators import validate_file_ext


# todo: upload process bar


@app.route('/upload')
def upload():
    return render_template('upload.html')


@app.route('/api/upload', methods=['POST'])
def uploader():
    if request.method == 'POST':
        if request.files and request.files.get('uploaded_file'):
            file = request.files['uploaded_file']
            suffix = file_extension(file.filename)
            if validate_file_ext(suffix):
                result = upload_file(file)
            else:
                return make_response(jsonify({'error': 'bad file type'}), 400)

            return make_response(jsonify({'result': result}), 201)
        else:
            return make_response(jsonify({'error': 'bad file type'}), 400)


@app.route('/api/<file_id>/reload')
def reload(file_id):
    if request.method == 'POST':
        if request.files and request.files.get('file_upload'):
            file = request.files['file_upload']
            suffix = file_extension(file.filename)
            if validate_file_ext(suffix):
                result = reload_file(file_id, file)
            else:
                return make_response(jsonify({'error': 'bad file type'}), 400)

            return make_response(jsonify({'result': result}), 201)
        else:
            return make_response(jsonify({'error': 'bad file type'}), 400)


@app.route('/api/<file_id>/delete')
def delete(file_id):
    pass


@app.route('/api/<file_id>/rename')
def delete(file_id):
    pass
