"""
Module for filtering files
"""
from app import app
from flask import request, jsonify, make_response
from app.models.files import File
from app.services.fields_definition import fields_definition
import pandas as pd


@app.route('/api/filter', methods=['POST'])
def filter_file():
    xl_file = pd.read_excel('../result.xls')

    column = ['Models', 'Body', 'Country']
    equal = ['==', '!=', '==']
    condition = ['Vitara', 'Sedan', 'USA']

    # print(xl_file[xl_file["Models"] == 'Vitara'].head())

    query = ''.join(f'{i} {j} {repr(k)} ' for i, j, k, o in zip(column, equal, condition))

    # print(xl_file[(xl_file["Models"] == 'Vitara') & (xl_file["Year"] > 2008)].head())
    print(xl_file.query(query))

    return query


@app.route('/api/save_filter', methods=['POST'])
def save_filter():
    return request.data


@app.route('/api/get_metadata', methods=['POST'])
def get_metadata():
    file_id = 1
    file = File.query.get(file_id)
    metadata = fields_definition(file.path)
    return make_response(jsonify(metadata), 200)
