import json

from flask import session, request
from app import app, db


@app.route('/api/process_file_and_send_to_email', methods=['POST'])
def file_process_to_mail():
    #load file
    pass