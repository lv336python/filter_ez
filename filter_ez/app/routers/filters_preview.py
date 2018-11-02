"""
TODO
"""
import json
from flask_login import login_required

from app import APP
from app.models.files import Filter


@APP.route('/api/preview/<int:filter_id>')
@login_required
def get_filters(filter_id):
    """
    View that return all Users Data by user id in session
    :return: response with user data JSON object
    """
    filters = Filter.query.get(filter_id)
    if not filters:
        return json.dumps({
            "message": 'filter does not exist'
        }), 404
    filter_params = filters.params
    return json.dumps({
        'message': filter_params
    }), 200
