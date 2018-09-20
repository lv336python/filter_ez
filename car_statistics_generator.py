"""
    Module for creating fake data about cars
"""
import json
import sys

from random import choice, randint
from string import ascii_lowercase, digits

import xlwt


def frange(start, end, step):
    """
    Yield float values in range from start to end
    :param start:
    :param end:
    :param step:
    :return: Yields values from start to end with a given step
    """
    curr = start
    while curr < end:
        yield curr
        curr += step


def generate_row(config):
    """
    Returns a list of values for one row of car characteristics data
    :return: ['X5', 'Audi', 'Sedan', ...]
    """
    stats = []
    for column in config['COLUMNS']:
        stats.append(choice(config['COL_DATA'][column]))
    return stats


def generate_bool_data(**kwargs):
    """
    Creates a list of values for bool type using given parameters
    :param kwargs: parameters for list generation
    :return list: [True] || [False] || [True, False]
    """
    return list(map(lambda x: "True" if x else "False", kwargs.get('choice', [True, False])))


def generate_int_data(**kwargs):
    """
    Creates a list of possible values for float type using given parameters
    :param kwargs: parameters for list generation
    :return list: all possible values column can have
    """
    data_choice_range = kwargs.get('choice', [])
    min_value = kwargs.get('min_value', 2)
    max_value = kwargs.get('max_value', 10)
    step = kwargs.get('step', 1)

    unique = min(kwargs.get('unique', 20), (max_value - min_value) / step)

    if data_choice_range:
        return list(filter(lambda x: isinstance(x, int), data_choice_range))

    while len(data_choice_range) < unique:
        choice_element = choice(range(min_value, max_value, step))
        if choice_element not in data_choice_range:
            data_choice_range.append(choice_element)
    return data_choice_range


def generate_float_data(**kwargs):
    """
    Creates a list of possible values for float type using given parameters
    :param kwargs: parameters for list generation
    :return list: all possible values column can have
    """
    data_choice_range = kwargs.get('choice', [])
    min_value = kwargs.get('min_value', 2)
    max_value = kwargs.get('max_value', 10)
    step = kwargs.get('step', 1)

    unique = min(kwargs.get('unique', 20), (max_value - min_value) / step)

    if data_choice_range:
        return filter(lambda x: isinstance(x, float), data_choice_range)

    while len(data_choice_range) < unique:
        choice_element = choice(list(frange(min_value, max_value, step)))
        if choice_element not in data_choice_range:
            data_choice_range.append(choice_element)
    return data_choice_range


def generate_string_data(**kwargs):
    """
    Creates a list of possible values for string type using given parameters
    :param kwargs: parameters for list generation
    :return list: all possible values column can have
    """
    data_choice_range = kwargs.get('choice', [])
    unique = kwargs.get('unique', 20)
    min_length = kwargs.get('min_length', 2)
    max_length = kwargs.get('max_length', 10)
    are_digits_allowed = kwargs.get('digit', False)
    capitalize = kwargs.get('capitalize', False)

    if data_choice_range:
        return list(map(str, data_choice_range))

    while len(data_choice_range) < unique:
        if are_digits_allowed:
            choice_element = ''.join([choice(ascii_lowercase+digits)
                                      for _ in range(randint(min_length, max_length))])
        else:
            choice_element = ''.join([choice(ascii_lowercase)
                                      for _ in range(randint(min_length, max_length))])
        if choice_element not in data_choice_range:
            if capitalize:
                choice_element = choice_element.capitalize()
            data_choice_range.append(choice_element)

    return data_choice_range


def generate_cell_data(**kwargs):
    """
    Returns list of possible values for a column of defined type or None
    :param kwargs: meta-data for a column
    :return list or [None]: values for column
    """
    if kwargs['type'] == "int":
        return generate_int_data(**kwargs)
    if kwargs['type'] == 'string':
        return generate_string_data(**kwargs)
    if kwargs['type'] == 'float':
        return generate_float_data(**kwargs)
    if kwargs['type'] == 'bool':
        return generate_bool_data(**kwargs)
    return ['None']


def configure_data_sets():
    """
    Parses json file with configurations and set necessary values like number of rows,
    columns and their data type, minimum and maximum values, etc
    :return dict: {'ROW_NUMBER': 20000, 'COLUMNS':['Country'], 'COL_DATA': {'Name': ['saf']}
    """
    configs = {}
    with open(sys.argv[1]) as conf_file:
        plain_text = conf_file.read()
        conf_json = json.loads(plain_text)
        configs['ROW_NUMBER'] = conf_json.get('row_number', 50000)
        if 'columns' in conf_json:
            configs['COLUMNS'] = list(conf_json['columns'].keys())
            configs['COL_DATA'] = {}
            for column in configs['COLUMNS']:
                configs['COL_DATA'][column] = generate_cell_data(**conf_json['columns'][column])
    return configs


def generate_data(configs):
    """
    Creates data frame with 50k rows of characteristics of
    cars and writes it to Excel file 'stats.xls'
    :return: None
    """
    workbook = xlwt.Workbook()
    sheet = workbook.add_sheet("Sheet 1")

    for index, column in enumerate(configs['COLUMNS']):
        sheet.write(0, index, column)
    for row_index in range(1, configs['ROW_NUMBER']+1):
        for col_index, col_value in enumerate(generate_row(configs)):
            sheet.write(row_index, col_index, col_value)

    workbook.save("result.xls")


def main():
    """
    Entrance point of the program with default config parameters
    If config file path is given as a system argument, configurations are taken from it
    :return: None
    """

    configs = configure_data_sets()
    generate_data(configs)


if __name__ == '__main__':
    main()
