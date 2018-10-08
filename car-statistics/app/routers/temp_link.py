'''
Module for temp_link view
'''
import json


from app import app
from app.services.temp_link_service import temp_token



@app.route('/api/temp/<token>')
def temp_link(token):
    """
    View that accept token and discript
    :param token:
    """
    filename = temp_token(token)

    if not filename:
        return json.dumps({
            'message': 'Link has been expired'
        }), 400

