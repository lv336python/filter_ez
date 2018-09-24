import json
from flask import session


from app import app, logger
from app.services import utils, file_data, notify_admin
from app.models import File, Dataset


@app.route('/api/statistics/<dataset_id>', methods=["GET"])
def get_statistics(dataset_id):
    user_id = int(session.get('user_id', 0))
    if user_id:
        dataset = Dataset.query.filter(Dataset.id == int(dataset_id)).first()
        if dataset:
            if dataset.user_id == user_id:
                file_path = utils.get_file_path(File.query.filter(File.id == dataset.file_id).first().path)
                try:
                    statistics = file_data.fields_statistics(file_path)
                    return json.dumps(statistics), 200
                except Exception as e:
                    logger.error(f"error when user tried to get statistics for {dataset_id}")
                    notify_admin(error_level="ERROR",
                                  message=f"Unexpected error occurred when tried to get statistics for"
                                          f" dataset {dataset_id}, Details {str(e)}")
                    return json.dumps({'status': 500,
                                            'message': 'Internal server error'}), 500
            else:
                return json.dumps({'status': 403,
                                    'message': 'access forbidden'}), 403
        else:
            return json.dumps({'status': 404,
                                'message': 'file does not exist'}), 404
    else:
        return json.dumps({'status': 401,
                            'message': 'not authorized'}), 401


@app.route('/api/get_rows/<dataset_id>', methods=["GET"])
def get_rows(dataset_id):
    user_id = int(session.get('user_id', 0))
    if user_id:
        dataset = Dataset.query.filter(Dataset.id == int(dataset_id)).first()
        if dataset:
            if dataset.user_id == user_id:
                file_path = utils.get_file_path(File.query.filter(File.id == dataset.file_id).first().path)
                try:
                    result = file_data.get_data_preview(file_path)
                    return json.dumps(result), 200
                except Exception as e:
                    logger.error(f"error when user tried to get statistics for {dataset_id}")
                    notify_admin(error_level="ERROR",
                                  message=f"Unexpected error occurred when tried to get statistics for"
                                          f" dataset {dataset_id}, Details {str(e)}")
                    return json.dumps({'status': 500,
                                            'message': 'Internal server error'}), 500
            else:
                return json.dumps({'status': 403,
                                    'message': 'access forbidden'}), 403
        else:
            return json.dumps({'status': 404,
                                'message': 'file does not exist'}), 404
    else:
        return json.dumps({'status': 401,
                            'message': 'not authorized'}), 401


