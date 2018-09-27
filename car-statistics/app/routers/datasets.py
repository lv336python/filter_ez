from app import app

from flask import jsonify, make_response, session
from flask_login import login_required

from app.services.filtering_service import make_dataset
from app.validators.validation import filter_file_relate


@app.route('/makedataset/<int:file_id>/<int:filter_id>', methods=['POST'])
@login_required
def filtering(file_id, filter_id):
    user_id = int(session['user_id'])
    if file_id and filter_id:
        if filter_file_relate(user_id, file_id, filter_id):
            result = make_dataset(user_id, file_id, filter_id)
            return make_response(jsonify({'result': result}), 201)

        return make_response(jsonify({'error': 'wrong params'}), 400)
    else:
        return make_response(jsonify({'error': 'wrong params'}), 400)


# @app.route('/filtering/<file_id>/<filter>/<value>', methods=['GET'])
# @login_required
# def filters(file_id, filter, value):
#     if file_id and filter and value:
#         result = avaliable fields(file_id, filter, value)
#         return result
#     else:
#         return make_response(jsonify({'error': 'wrong params'}), 400)
