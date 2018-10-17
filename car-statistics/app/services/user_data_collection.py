from app.models import File, Filter, Dataset


def get_user_datasets(user_id):
    """
    retruns user datasets
    :param user_id:
    :return:
    """
    user_datasets = [{
        'id': dts.id,
        'file_id': dts.file_id,
        'filter_id': dts.filter_id,
        'date': dts.date
        } for dts in Dataset.query.filter_by(user_id=user_id).all()]
    return user_datasets


def get_user_files(user_id):
    """
    Returns user files
    :param user_id:
    :return:
    """
    files_ids = [dts['file_id'] for dts in get_user_datasets(user_id)]
    user_files = [File.query.get(id) for id in set(files_ids)]
    files = [{
        'id': file.id,
        'name': file.attributes['name'],
        'size': file.attributes['size'],
        'rows': file.attributes['rows']
        } for file in user_files]
    return files


def get_user_filters(user_id):
    """
    Returns user filters
    :param user_id: user i
    :return: filters
    """
    filters_ids = [dts['filter_id'] for dts in get_user_datasets(user_id) if isinstance(dts['filter_id'], int)]
    user_filters = [Filter.query.get(id) for id in set(filters_ids)]
    filters = [{
        'id': item.id,
        'name': item.name
        } for item in user_filters]
    return filters


def get_all_user_data(user_id):
    """
    Function that return all user data.
    :param user_id:
    :return: all user data
    """
    user_files = get_user_files(user_id)
    user_filters = get_user_filters(user_id)
    user_datasets = get_user_datasets(user_id)
    return {'user_files':user_files, 'user_filters':user_filters, 'user_datasets':user_datasets}
