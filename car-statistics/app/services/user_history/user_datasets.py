from app.models import File, Filter, Dataset


def get_datasets(user_id):
    user_datasets = [{
        'dataset_id': dataset.id,
        'file_id': dataset.file_id,
        'filter_id': dataset.filter_id,
        'date': dataset.date
    }
        for dataset in Dataset.query.filter(Dataset.user_id == user_id)]
    return user_datasets


def get_files(user_id):
    file_ids = [file['file_id'] for file in get_datasets(user_id)]
    user_files = [File.query.get(id) for id in file_ids]
    files = [{
        'id': file.id,
        'path': file.path,
        'name': file.attributes['loaded']
    }
        for file in user_files]
    return files


def get_user_filters(user_id):
    filter_ids = set([dataset['filter_id'] for dataset in get_datasets(user_id)])
    filters = [
        {
            'id': filter.id,
            'name': filter.name
        }
        for filter in [Filter.query.get(id) for id in filter_ids]]
    return filters


def get_all_user_data(user_id):
    datasets = get_datasets(user_id)
    files = get_files(user_id)
    filters = get_user_filters(user_id)

    return {'datasets': datasets, 'files': files, 'filters' : filters}
