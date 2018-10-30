"""
Module include FilterApplier class.
"""
import copy
from app.helper.DataSetPandas import DataSetPandas as Dsp
from app.models import Filter


class FilterApplier:
    """
    FilterApplier class is used to apply filter to selected DataSet(File)
    """
    def __init__(self, dataset_id, filter_id):
        self.dataset_id = dataset_id
        self.filter_id = filter_id
        self.result = Dsp()
        self.filters = self.get_filter()

    def get_filter(self):
        """Returns params of given filter"""
        filters = Filter.query .get(self.filter_id)
        return filters.params['params']

    def filter_apply(self):
        """
        Apply filter to DataFrame formed from given DataSet.
        Returns list of DataFrame indexes of selected rows.
        """
        data = Dsp(self.dataset_id)
        data.actualize()
        print(data.dataframe.shape)
        self.filter_iterator(data, self.filters)
        return self.result.content_indexes()

    def filter_iterator(self, data, filters):
        """
        Filtration Iterator is used recursively to iterate over all filter tree branches.
        It applies all filters on each step before get the deepest filtration level, after
        that it makes sample from last DataFrame on branch.
        :param data: filtration level DataFrame
        :param filters: filtration level filter
        :return:Sample from last filtration level by applying needed amount of items
        """
        for val in filters.values():
            result_df = copy.deepcopy(data)
            if val.get('child'):
                result_df.filter_set(val['params'])
                next_df = copy.deepcopy(result_df)
                self.filter_iterator(next_df, val['child'])
            else:
                next_df = copy.deepcopy(result_df)
                next_df.filter_set(val['params'])
                rrr = next_df.sample(val['params']['quantity'])
                self.result.append_df(rrr)
