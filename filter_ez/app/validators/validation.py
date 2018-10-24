"""
TODO
"""
from app import APP
from app.models import Dataset


def validate_file_ext(ext):
    """

    :param ext: file extension name
    :return:
    """
    allowed = APP.config['ALLOWED_EXTENSIONS']
    return ext in allowed


def validate_file_content():
    """

    :return:
    """
    pass


def validate_size():
    """

    :return:
    """
    pass


def filter_file_relate(user_id, file_id, filter_id):
    """
    Simply check if Filter can be applied to File.
    Checks if is there any relation in DB for file_id and filter_id
    :param file_id: id of File
    :param filter_id: id of Filter
    :return: True when filter was applied, otherwise False
    """
    subsets = Dataset.query.filter_by(file_id=file_id).all()
    filters = ((dtst.user_id, dtst.filter_id) for dtst in subsets)
    return (user_id, filter_id) in filters
