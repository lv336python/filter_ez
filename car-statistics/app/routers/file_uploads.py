import os

from app import app
from flask import render_template, request, jsonify, make_response
from app.services.file_upload import file_uploader

# verify that upload folder exists
if not os.path.isdir(app.config['UPLOAD_FOLDER']):
    os.mkdir(app.config['UPLOAD_FOLDER'])

# todo: upload process bar


@app.route('/upload')
def upload_file():
    return render_template('upload.html')


@app.route('/api/uploader', methods=['POST'])
def uploader():
    if request.method == 'POST':
        if request.files and request.files.get('file'):
            # add validation
            file_to_upload = request.files['file']
            res = file_uploader(file_to_upload)
            return make_response(jsonify({'done': True}), 201)
        else:
            return make_response(jsonify({'error': 'bad file type'}), 400)
