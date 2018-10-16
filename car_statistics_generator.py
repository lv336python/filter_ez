"""
    Module for creating fake data about cars
"""
import csv
import json
import sys
import xlsxwriter
import xlwt

from random import choice, randint
from string import ascii_lowercase, digits


def float_range(start, end, step):
    """
    Helping function: yields float values in range from start to end
    :param start:
    :param end:
    :param step:
    :return: Yields values from start to end with a given step
    """
    curr = start
    while curr < end:
        yield curr
        curr += step


class ExcelGenerator:
    """
    Generates .xlsx, .xls, or .csv file with information generated
    according to configuration file.
    """
    def __init__(self, configs=None, path=None):
        """
        :param configs: - dict object with configurations. may be string object, will cast to str
        {
            "ROW_NUMBER": 10000
            "COLUMNS": {
                    "Mark": ['BMW', 'Audi', 'Mercedes'],
                    "Color": ['Red', 'Blue', 'Green'],
                    "Year": [1995, 1992, 2012],
                    "Volume": [12.2, 13.5, 16.4],
                    "Weight": range(100, 4000)
                }
        }

        :param path: path to configuration file in json format
        If the configs given, the configs will be validated and the path will be omitted
        """
        self.configs_path = path
        self.configs = configs

        if configs:
            if self.is_valid_config(configs):
                self.configs = configs
            raise Exception("Wrong configuration format")

        elif path:
            self.configs = configs or self.read_configs(path)

    @staticmethod
    def is_valid_config(configs):

        row_number = configs.get('ROW_NUMBER')
        if not(isinstance(row_number, int) and row_number > 0):
            return False

        columns = configs.get('COLUMNS')
        if not isinstance(columns, dict):
            return False

        if not len(configs['COLUMNS']):
            return False

        for column in configs['COLUMNS']:
            if not isinstance(column, str):
                return False

            if not isinstance(configs['COLUMNS'][column], list) \
                    or len(configs['COLUMNS'][column]) == 0:
                return False

        return True

    def read_configs(self, config_path):
        """
        Opens file to which the path leads and reads configuration from it
        :param config_path: str value - path to file
        """
        self.configs = {}

        with open(config_path) as conf_file:
            configs_json = json.loads(conf_file.read())
            self.configs['ROW_NUMBER'] = configs_json.get('row_number', 50000)
            self.configs['COLUMNS'] = {}
            cols = list(configs_json['columns'].keys())
            for column in cols:
                self.configs['COLUMNS'][column] = self.generate_cell_data(configs_json['columns'][column])

    def generate_cell_data(self, row_config):
        """
        Returns list of possible values for a column of defined type or None
        :param row_config: meta-data for a column
        :return list or [None]: values for column
        """
        if row_config['type'] == "int":
            return self.generate_int_data(row_config)
        if row_config['type'] == 'string':
            return self.generate_string_data(row_config)
        if row_config['type'] == 'float':
            return self.generate_float_data(row_config)
        if row_config['type'] == 'bool':
            return self.generate_bool_data(row_config)
        return ['None']

    @staticmethod
    def generate_bool_data(row_config):
        """
        Creates a list of values for bool type using given parameters
        :param row_config: parameters for list generation
        :return list: [True] || [False] || [True, False]
        """
        return list(map(lambda x: "True" if x else "False", row_config.get('choice', [True, False])))

    @staticmethod
    def generate_int_data(row_config):
        """
        Creates a list of possible values for float type using given parameters
        :param row_config: parameters for list generation
        :return list: all possible values column can have
        """
        data_choice_range = row_config.get('choice', [])
        min_value = row_config.get('min_value', 2)
        max_value = row_config.get('max_value', 10)
        step = row_config.get('step', 1)

        unique = min(row_config.get('unique', 20), (max_value - min_value) / step)

        if data_choice_range:
            return list(filter(lambda x: isinstance(x, int), data_choice_range))

        while len(data_choice_range) < unique:
            choice_element = choice(range(min_value, max_value, step))
            if choice_element not in data_choice_range:
                data_choice_range.append(choice_element)
        return data_choice_range

    @staticmethod
    def generate_float_data(row_config):
        """
        Creates a list of possible values for float type using given parameters
        :param row_config: parameters for list generation
        :return list: all possible values column can have
        """
        data_choice_range = row_config.get('choice', [])
        min_value = row_config.get('min_value', 2)
        max_value = row_config.get('max_value', 10)
        step = row_config.get('step', 1)

        unique = min(row_config.get('unique', 20), (max_value - min_value) / step)

        if data_choice_range:
            return filter(lambda x: isinstance(x, float), data_choice_range)

        while len(data_choice_range) < unique:
            choice_element = choice(list(float_range(min_value, max_value, step)))
            if choice_element not in data_choice_range:
                data_choice_range.append(choice_element)
        return data_choice_range

    @staticmethod
    def generate_string_data(row_config):
        """
        Creates a list of possible values for string type using given parameters
        :param row_config: parameters for list generation
        :return list: all possible values column can have
        """
        data_choice_range = row_config.get('choice', [])
        unique = row_config.get('unique', 20)
        min_length = row_config.get('min_length', 2)
        max_length = row_config.get('max_length', 10)
        are_digits_allowed = row_config.get('digit', False)
        capitalize = row_config.get('capitalize', False)

        if data_choice_range:
            return list(map(str, data_choice_range))

        while len(data_choice_range) < unique:
            if are_digits_allowed:
                choice_element = ''.join([choice(ascii_lowercase + digits)
                                          for _ in range(randint(min_length, max_length))])
            else:
                choice_element = ''.join([choice(ascii_lowercase)
                                          for _ in range(randint(min_length, max_length))])
            if choice_element not in data_choice_range:
                if capitalize:
                    choice_element = choice_element.capitalize()
                data_choice_range.append(choice_element)

        return data_choice_range

    def generate_row(self):
        """
        Returns a list of values for one row of car characteristics data
        :return: ['X5', 'Audi', 'Sedan', ...]
        """
        row_data = []
        for column in self.configs['COLUMNS'].keys():
            row_data.append(choice(self.configs['COLUMNS'][column]))
        return row_data

    def save_xlsx(self, name, sheet_name='Sheet 1'):
        workbook = xlsxwriter.Workbook(name)
        sheet = workbook.add_worksheet(sheet_name)

        for index, column in enumerate(self.configs['COLUMNS']):
            sheet.write(0, index, column)
        for row_index in range(1, self.configs['ROW_NUMBER'] + 1):
            for col_index, col_value in enumerate(self.generate_row()):
                sheet.write(row_index, col_index, col_value)

        workbook.close()

    def save_xls(self, name, sheet_name='Sheet 1'):
        if self.configs['ROW_NUMBER'] > 65536:
            print('Cannot save more than 65536 rows to XLS file')
            return False
        workbook = xlwt.Workbook()
        sheet = workbook.add_sheet(sheet_name)

        for index, column in enumerate(self.configs['COLUMNS']):
            sheet.write(0, index, column)
        for row_index in range(1, self.configs['ROW_NUMBER'] + 1):
            for col_index, col_value in enumerate(self.generate_row()):
                sheet.write(row_index, col_index, col_value)

        workbook.save(name)

    def save_csv(self, name):
        with open(name, 'w', newline='') as csvfile:
            csv_writer = csv.writer(csvfile, delimiter=';',
                                    quotechar='|', quoting=csv.QUOTE_MINIMAL)
            csv_writer.writerow(self.configs['COLUMNS'].keys())

            for row_index in range(self.configs['ROW_NUMBER']):
                csv_writer.writerow(self.generate_row())


if __name__ == '__main__':
    generator = ExcelGenerator()
    generator.read_configs(sys.argv[1])

    if len(sys.argv) == 3:
        if sys.argv[2] == 'csv':
            generator.save_csv('result.csv')
        elif sys.argv[2] == 'xls':
            generator.save_xls('result.xls')
        elif sys.argv[2] == 'xlsx':
            generator.save_xlsx('result.xlsx')
    else:
        generator.save_csv('result.csv')
