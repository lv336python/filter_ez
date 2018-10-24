"""
TODO
"""
from flask import jsonify, make_response, session
from flask_login import login_required

from app import APP

from app.services.filtering_service import make_dataset


@APP.route('/makedataset/<int:file_id>/<int:filter_id>', methods=['POST'])
@login_required
def filtering(file_id, filter_id):
    """
    TODO
    :param file_id:
    :param filter_id:
    :return:
    """
    user_id = int(session['user_id'])
    if file_id and filter_id:
        result = make_dataset(user_id, file_id, filter_id)
        return make_response(jsonify({'result': result}), 201)

    return make_response(jsonify({'error': 'wrong params'}), 400)
