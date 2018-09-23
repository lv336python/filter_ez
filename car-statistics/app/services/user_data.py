"""
Service to perform file upload
"""
import os
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
    :return: message that file was uploaded
    """
    u_id = session.get('user_id')
    upload_dir = user_dir(u_id)
    file_pth = file_path(upload_dir, file.filename)
    if os.path.exists(file_pth):
        file.save(file_pth)
        attr = attributes(file_pth)
        upd_file = File.query.filter_by(path=file_pth).first()
        upd_file.attributes = {"name": "Updated"}
        db.session.commit()
        return 'Updated'
    create_dir(upload_dir)
    file.save(file_pth)
    attr = attributes(file_pth)

    new_file = File(path=file_pth, attributes=attr)
    db.session.add(new_file)
    db.session.flush()
    new_dataset = Dataset(user_id=u_id, file_id=new_file.id)
    db.session.add(new_dataset)
    db.session.commit()
    flash('File Uploaded', category='success')
    return 'Uploaded'
