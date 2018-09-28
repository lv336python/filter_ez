import json
from flask import session


from app import app
from app.services import utils, file_data
from app.models import Dataset
from flask_login import login_required


@app.route('/api/statistics/<dataset_id>', methods=["GET"])
@login_required
def get_statistics(dataset_id):
    user_id = int(session['user_id'])
    dataset = Dataset.query.filter(Dataset.id == int(dataset_id)).first()
    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != user_id:
        return json.dumps({'message': 'access forbidden'}), 403

    file_path = utils.get_user_file(dataset.file_id, user_id)
    statistics = file_data.fields_statistics(file_path)
    return json.dumps(statistics), 200


@app.route('/api/get_rows/<dataset_id>', methods=["GET"])
@login_required
def get_rows(dataset_id):
    user_id = int(session['user_id'])
    dataset = Dataset.query.filter(Dataset.id == int(dataset_id)).first()
    if not dataset:
        return json.dumps({'message': 'file does not exist'}), 404

    if dataset.user_id != user_id:
        return json.dumps({'message': 'access forbidden'}), 403
    file_path = utils.get_user_file(dataset.file_id, user_id)
    result = file_data.get_data_preview(file_path)
    return json.dumps(result), 200
