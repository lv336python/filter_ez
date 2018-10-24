'''
Main view for '/' address
'''
from flask import render_template

from app import APP


@APP.route('/', defaults={'path': ''})
@APP.route('/<path:path>')
def index(path):# pylint: disable=unused-argument
    """
    Main route
    :param path:
    :return: template
    """
    return render_template('index.html')
