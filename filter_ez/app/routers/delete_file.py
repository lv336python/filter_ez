import json
from app import app, db

from flask import session
from flask_login import login_required
from app.models import File, Dataset
from app.helper import UserFilesManager
from flask_api import status


@app.route('/api/delete_file/<int:file_id>')
@login_required
def delete_file(file_id):
    """
    Delete user files from DB and folder
    :param dataset_id:
    :param file_id: file id 
    :return: None
    """
    user_id = session['user_id']

    ufm = UserFilesManager(int(user_id))

    dataset = Dataset.query.filter(Dataset.user_id == user_id).first()
    if not dataset:
        json.dumps({"message": 'dataset does not exist'}), 
    file = File.query.filter(File.id == file_id).first()
    if not file:
        return json.dumps({'message': 'file does not exist'}),status.HTTP_404_NOT_FOUND
    if not dataset.user_id:
        return json.dumps({'message': 'access forbidden'}), status.HTTP_403_FORBIDDEN

    print(file_id)
    ufm.delete_file(file_id)

    return json.dumps({"message" : "file deleted"}), status.HTTP_200_OK

