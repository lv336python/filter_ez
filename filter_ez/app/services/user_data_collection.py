"""
Module containing UserDataCollector Class
"""

from app.models import File, Filter, Dataset


class UserDataCollector:
    """
    This is a Class to provide all data of given User
    """

    def __init__(self, user_id):
        self.user_id = user_id
        self.datasets = self.get_datasets()
        self.files = self.get_files()
        self.filters = self.get_filters()

    def get_datasets(self):
        """
        Returns all User records from DB table 'datasets'.
        """
        return Dataset.query.filter_by(user_id=self.user_id).all()

    def get_files(self):
        """
        Returns list of all Users Files.
        """
        return [File.query.get(id) for id in self.get_files_ids()]

    def get_filters(self):
        """
        Returns list of users files
        """
        return [Filter.query.get(ids) for ids in self.get_filters_ids()]

    def get_datasets_ids(self):
        """
        Returns ids of all User records from DB table 'datasets'.
        """
        return [dts.id for dts in self.datasets]

    def get_files_ids(self):
        """
        Returns ids of all Users Files.
        """
        return {dts.file_id for dts in self.datasets}

    def get_filters_ids(self):
        """
        Returns ids of all filters applied by User
        """
        return {dts.filter_id for dts in self.datasets if dts.filter_id}

    @staticmethod
    def get_dataset_name(file_id, filter_id):
        """
        This method forms a name for Users Dataset
        by concatenation if source File name with applied Filter name.
        """
        source_file = File.query.get(file_id)
        applied_filter = Filter.query.get(filter_id)
        return f"{source_file.attributes['name']} {applied_filter.name}"

    def get_datasets_info(self):
        """
        Returns list of dictionaries containing
        attributes: {'id', 'fileId', 'filterId', 'createDate', 'nItems', 'name'}
        for each DataSet.
        """
        user_datasets = [{
            'id': dts.id,
            'fileId': dts.file_id,
            'filterId': dts.filter_id,
            'createDate': dts.date,
            'nItems': len(dts.included_rows),
            'name': self.get_dataset_name(dts.file_id, dts.filter_id)
        } for dts in self.datasets if dts.filter_id and dts.included_rows]
        return user_datasets

    def get_files_info(self):
        """
        Returns list of dictionaries containing
        attributes: {'id', 'name', 'size', 'nRows', 'dataSetId'}
        for each File.
        """
        files = [{
            'id': file.id,
            'name': file.attributes['name'],
            'size': file.attributes['size'],
            'nRows': file.attributes['rows'],
            'datasetId': dts.id
            }
                 for file in self.files
                 for dts in self.datasets
                 if not dts.filter_id and dts.file_id == file.id
                ]
        return files

    def get_filters_info(self):
        """
        Returns list of dictionaries containing
        attributes: {'id', 'name'} for each Filter.
        """
        filters = [{
            'id': item.id,
            'name': item.name,
            'fileId': dts.file_id
        } for item in self.filters
          for dts in self.datasets
          if dts.filter_id == item.id]
        return filters

    def get_all_data(self):
        """
        Returns all Users Data as dictionary {'userFiles': , 'userFilters': , 'userDataSets': }
        """
        user_files = self.get_files_info()
        user_filters = self.get_filters_info()
        user_datasets = self.get_datasets_info()
        return {'userFiles': user_files, 'userFilters': user_filters, 'userDataSets': user_datasets}
