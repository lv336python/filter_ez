from app import app


def validate_file_ext(ext):
    """

    :param ext: file extension name
    :return:
    """
    allowed = app.config['ALLOWED_EXTENSIONS']
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
