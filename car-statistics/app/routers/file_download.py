import json
import pandas as pd
from io import BytesIO
from app import app, logger
from app.models import File, Dataset
from app.services import utils, notify_admin
from flask import send_file, session


@app.route("/api/download/<int:dataset_id>", methods=['GET'])
def download(dataset_id):
    """
    Returns xls file. If dataset.filter_id is equal to None, returns original file
    else read DataFrame from it and removes all rows which are in dataset.included_rows
    and then writes changed DataFrame to ByteIO object which is sent as a file
    :param dataset_id: id of dataset to return for download
    :return: File or JSON with error
    """
    user_id = int(session.get('user_id', 0))
    if user_id:
        dataset = Dataset.query.filter(Dataset.id == int(dataset_id)).first()
        if dataset:
            if dataset.user_id == user_id:
                file_path = utils.get_file_path(File.query.filter(File.id == dataset.file_id).first().path) # Temporary, while upload not done
                if dataset.filter_id:
                    # BytesIO Created to avoid writing temporary files in physical memory
                    try:
                        byte_writer = BytesIO()
                        excel_writer = pd.ExcelWriter(byte_writer, engine='xlwt')
                        df = pd.read_excel(file_path)
                        df = df.iloc[dataset.included_rows]
                        df.to_excel(excel_writer, sheet_name='Sheet1', index=False)
                        excel_writer.save()
                        byte_writer.seek(0)
                        logger.info(f"User {user_id} successfully downloaded dataset {dataset_id}")
                        return send_file(byte_writer,
                                         attachment_filename='result.xlsx',
                                         as_attachment=True,
                                         mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    except Exception as e:
                        logger.error(f"error when user {user_id} downloaded {dataset_id}")
                        notify_admin(error_level="ERROR",
                                     message=f"Unexpected error occurred when user {user_id} tried to download"
                                             f" dataset {dataset_id}, Details {str(e)}")
                        return json.dumps({'status': 500,
                                           'message': 'Internal server error'}), 500

                else:
                    return send_file(utils.get_file_path(file_path))  # Maybe use celery
            else:
                return json.dumps({'status': 403,
                                   'message': 'access forbidden'}), 403
        else:
            return json.dumps({'status': 404,
                               'message': 'file does not exist'}), 404
    else:
        return json.dumps({'status': 401,
                           'message': 'not authorized'}), 401
