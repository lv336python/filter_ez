from flask import Flask
import json
import plotly
from pandas import read_excel
import plotly.graph_objs as go

import numpy as np

app = Flask(__name__)

df = read_excel('car_statistics.xls', sheet_name='Sheet 1')


@app.route('/api/carStatistics')
def multiLine():
    count = 500
    xScale = np.linspace(0, 500, count)

    # Create traces
    trace1 = go.Scatter(
        x=xScale,
        y=np.random.randn(count),
        name="Make",
        mode="lines"
    )

    trace2 = go.Scatter(
        x=xScale,
        y=np.random.randn(count),
        name="Year",
        mode="lines"
    )

    trace3 = go.Scatter(
        x=xScale,
        y=np.random.randn(count),
        name="Price",
        mode="lines"
    )

    data = [trace1, trace2, trace3]
    return json.dumps({'status': 200, 'graph': data, 'message': 'Multi-line chart'}), 200
