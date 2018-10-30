from app.helper.DataSetPandas import DataSetPandas as DSP
from app.models import Filter
import copy

class Filtrator:
    """
    Filtrator
    """
    def __init__(self, dataset_id, filter_id):
        self.dataset_id = dataset_id
        self.filter_id = filter_id
        self.result = DSP()
        self.filters = self.get_filter()

    def get_filter(self):
        """
        Gert filter from database
        :return:
        """
        filters = Filter.query .get(self.filter_id)
        return filters.params['params']

    def filter_apply(self):
        """

        :return:
        """
        data = DSP(self.dataset_id)
        self.filter_iterator(data, self.filters)

    def filter_iterator(self, data, filters):
        """
        Filtration iterator
        :param data:
        :param filters:
        :return:
        """
        for key, val in filters.items():
            result_df = copy.deepcopy(data)
            if val.get('child'):
                result_df.filter_set(val['params'])
                next_df = copy.deepcopy(result_df)
                self.filter_iterator(next_df, val['child'])
            else:
                next_df = copy.deepcopy(result_df)
                next_df.filter_set(val['params'])
                rrr = next_df.sample(val['params']['quantity'])
                self.result.dataframe = self.result.dataframe.append(rrr)

    def result_indexes(self):
        return self.result.indexes()



