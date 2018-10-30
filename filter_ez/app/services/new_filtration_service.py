from app.helper.DataSetPandas import DataSetPandas as DSP
from app.models import Filter
import pandas as pd
file = '/home/srhstas/Desktop/ss_dev/car-statistics/filter_ez/usersdata/uploads/2/ee387028a39f4047f788e1ab0d99e717.pkl'
filter2 = {'params': {'0': {'child': {'0': {'params': {'column': 'Color', 'operator': '==', 'value': 'Yellow', 'quantity': 249}, 'child': {'0': {'params': {'column': 'Country', 'operator': '==', 'value': 'Ukraine', 'quantity': 24}, 'child': False}, '1': {'params': {'column': 'Country', 'operator': '==', 'value': 'USA', 'quantity': 37}, 'child': False}}}, '1': {'params': {'column': 'Color', 'operator': '==', 'value': 'Green', 'quantity': 999}, 'child': {'0': {'params': {'column': 'Fuel type', 'operator': '==', 'value': 'Electric', 'quantity': 149}, 'child': False}, '1': {'params': {'column': 'Fuel type', 'operator': '==', 'value': 'Hybrid', 'quantity': 199}, 'child': False}}}, '2': {'params': {'column': 'Color', 'operator': '==', 'value': 'Blue', 'quantity': 499}, 'child': False}}, 'params': {'column': 'Body', 'operator': '==', 'value': 'Crossover', 'quantity': 4999}}, '1': {'params': {'column': 'Body', 'operator': '==', 'value': 'Sedan', 'quantity': 4999}}}}

dataframe = pd.read_pickle(file)
pd.DataFrame.mask = lambda df, k, v: df[df[k]==v]

class Filtrator:
    """
    Filtrator
    """
    def __init__(self, dataset_id, filter_id):
        self.dataset_id = dataset_id
        self.filter_id = filter_id
        self.result = pd.DataFrame()
        self.filters = self.get_filter()

    def get_filter(self):
        """
        Gert filter from database
        :return:
        """
        filters = Filter.query .get(self.filter_id)
        return filters['params']

    def filter_apply(self):
        data = DSP(self.dataset_id)

    def filter_iterator(self):
        """
        Filtration iterator
        :param dataframe:
        :param filters:
        :return:
        """
        for key, val in self.filters.items():
            if val.get('child'):
                result_df = dataframe.mask(val['params']['column'], val['params']['value'])
                self.filter_iterator(result_df, val['child'])
            else:
                result_df = dataframe.mask(val['params']['column'], val['params']['value'])
                sample = result_df.sample(val['params']['quantity'])
                self.result.append(sample)


