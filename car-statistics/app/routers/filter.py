"""
Module for filtering files
"""
from app import app
import pandas as pd


@app.route('/api/filter', methods=['POST'])
def filter_file():
    xl_file = pd.read_excel('../result.xls')

    column = ['Models', 'Body', 'Country']
    equal = ['==', '==', '==']
    condition = ['Vitara', 'Sedan', 'USA']
    operator = ['&', '|', ' ']

    # print(xl_file[xl_file["Models"] == 'Vitara'].head())

    query = ''.join(f'{i} {j} {repr(k)} {o} ' for i, j, k, o in zip(column, equal, condition, operator))

    # print(xl_file[(xl_file["Models"] == 'Vitara') & (xl_file["Year"] > 2008)].head())
    print(xl_file.query(query))

    return query

