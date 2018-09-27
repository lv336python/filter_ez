"""
Module for filtering files
"""
from app import app
from flask import request, jsonify, make_response, json
from app.models.files import File
from app.services.fields_definition import fields_definition
import pandas as pd


@app.route('/api/filter', methods=['POST'])
def filter_file(data):
    xl_file = pd.read_excel('uploads_temp/None/4972538112b4d656ef2755b1bfc76d2c.xls')

    for elem in data:
        xl_file = xl_file[mask_f(xl_file, elem)]

    print(xl_file)
    return ''


@app.route('/api/save_filter', methods=['POST'])
def save_filter():
    data = json.loads(request.data)
    xl_file = pd.read_excel('uploads_temp/None/4972538112b4d656ef2755b1bfc76d2c.xls')
    for elem in data:
        if 'quantity' in elem:
            xl_file = xl_file[mask_f(xl_file, elem)].head(elem['quantity'])
        else:
            xl_file = xl_file[mask_f(xl_file, elem)]
    print(xl_file['id'])
    return make_response(jsonify(xl_file.shape[0]), 200)


@app.route('/api/get_metadata', methods=['POST'])
def get_metadata():
    file_id = 1
    file = File.query.get(file_id)
    metadata = fields_definition(file.path)
    count_rows = pd.read_excel(file.path).shape[0]
    result = {'rows': count_rows, 'metadata': metadata}
    return make_response(jsonify(result), 200)


@app.route('/api/count_rows', methods=['POST'])
def filter_num_rows():
    data = json.loads(request.data)
    xl_file = pd.read_excel('uploads_temp/None/4972538112b4d656ef2755b1bfc76d2c.xls')

    for elem in data:
        if 'quantity'in elem:
            xl_file = xl_file[mask_f(xl_file, elem)].head(elem['quantity'])
        else:
            xl_file = xl_file[mask_f(xl_file, elem)]

    return make_response(jsonify(xl_file.shape[0]), 200)


def mask_f(dataframe, params):
    column = params['column']
    operator = params['operator']
    value = params['value']
    if operator == '==':
        criteria = (dataframe[column] == value)
    elif operator == '!=':
        criteria = (dataframe[column] != value)
    elif operator == '>':
        criteria = (dataframe[column] > value)
    elif operator == '<':
        criteria = (dataframe[column] < value)
    else:
        pass

    return criteria


