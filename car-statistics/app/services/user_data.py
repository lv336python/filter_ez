"""
Service to perform file upload
"""

from app import db
from app.models.files import File, Dataset

from flask import session, flash
from app.services.utils import create_dir, user_dir,  file_path, attributes


def upload_file(file, *args, **kwargs):
    """
    Function adds file to Files table and saves it in users directory
    :param file: object of request.files
    :param args:
    :param kwargs:
    :return: messege that file was uploaded
    """
    u_id = session.get('user_id')
    upload_dir = user_dir(u_id)
    create_dir(upload_dir)
    file_pth = file_path(upload_dir, file.filename)
    file.save(file_pth)
    attr = attributes(file_pth)
    new_file = File(path=file_pth, attributes=attr)
    db.session.add(new_file)
    db.session.commit()
    new_dtst = Dataset(user_id=u_id, file_id=new_file.id)
    db.session.add(new_dtst)
    db.session.commit()
    flash('File Uploaded', category='success')
    return 'Uploaded'
