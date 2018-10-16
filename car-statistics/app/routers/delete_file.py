import json
from app import app,db

from flask import session
from flask_login import login_required
from app.models import File, Dataset
from app.services.utils import user_dir, ext_free, delete_files_from_dir
import os
@app.route('/api/delete_file/<int:file_id>')
@login_required
def delete_file(file_id):

    user_id = int(session.get('user_id', 0))
    dataset = Dataset.query.filter(Dataset.user_id == user_id).first()
    file = File.query.filter(File.id == file_id).first()
    if not file:
        return json.dumps({'message': 'file does not exist'}), 404
    if dataset.user_id != user_id:
        return json.dumps({'message': 'access forbidden'}), 403
    File.query.filter(File.id == file_id).delete()
    user_directory = user_dir(user_id)
    user_file = file.path
    delete_files_from_dir(user_directory, user_file)
    
    return json.dumps({'message': 'file successfully deleted'}), 200
