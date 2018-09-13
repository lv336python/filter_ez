'''
Main view for '/' address
'''
from app import app

from flask import render_template

from .registration.login_required import login_required

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@login_required
def index(path):
    return render_template('index.html')
