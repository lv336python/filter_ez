from app.models import File, Filter, Dataset


class UserDataCollector:

    def __init__(self, user_id):
        self.user_id = user_id
        self.datasets = Dataset.query.filter_by(user_id=user_id).all()

    def get_datasets_ids(self):
        """
        Method for getting ids of all user datasets
        :return: list of ids
        """
        return [dts.id for dts in self.datasets]

    def get_user_files_ids(self):
        """
        Methot for getting ids of user files
        :return: set of file ids
        """
        return set([dts.file_id for dts in self.datasets])

    def get_user_filters_ids(self):
        """
        Method for getting filter ids
        :return: list of filter ids
        """
        return set([dts.filter_id for dts in self.datasets if dts.filter_id])

    def get_user_datasets(self):
        """
        retruns user datasets
        :param user_id:
        :return:
        """
        user_datasets = [{
            'id': dts.id,
            'file_id': dts.file_id,
            'filter_id': dts.filter_id,
            'date': dts.date,
            'included': len(dts.included_rows)
            } for dts in self.datasets if dts.filter_id]
        return user_datasets

    def get_user_files(self):
        """
        Returns user files
        :param user_id:
        :return:
        """
        user_files = [File.query.get(id) for id in self.get_user_files_ids()]
        files = [{
            'id': file.id,
            'name': file.attributes['name'],
            'size': file.attributes['size'],
            'rows': file.attributes['rows']
            } for file in user_files]
        return files

    def get_user_filters(self):
        """
        Returns user filters
        :param user_id: user i
        :return: filters
        """
        user_filters = [Filter.query.get(ids) for ids in self.get_user_filters_ids()]
        filters = [{
            'id': item.id,
            'name': item.name
            } for item in user_filters]
        return filters

    def get_all_user_data(self):
        """
        Function that return all user data.
        :param user_id:
        :return: all user data
        """
        user_files = self.get_user_files()
        user_filters = self.get_user_filters()
        user_datasets = self.get_user_datasets()
        return {'user_files':user_files, 'user_filters':user_filters, 'user_datasets':user_datasets}
