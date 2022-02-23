import gc
import os
import dicttoxml
from flask import Flask, jsonify

if os.environ['FLASK_ENV'] == 'prod':
    print("flask_prod")
else:
    print("flask_dev")
    os.environ['R_HOME'] = 'C:/Program Files/R/R-4.0.2'
    # must be set before rpy2 import
    # only necessary locally

import rpy2.robjects as robj
from rpy2.robjects.vectors import FloatVector

FILEPATH = "./BN_filter_R_v2/"

app = Flask(__name__)


@app.route('/')
def index():
    return "alive"


@app.route('/fred-time-series')
def fred_time_series():
    return "alive"


@app.route('/user-specified-time-series')
def user_specified_time_series():
    R = robj.r
    R.source(FILEPATH + "bnf_fcns.R")

    def US_GDP_test_data():
        list2 = []
        with open(FILEPATH + "us_data.csv") as f:
            for row in f:
                try:
                    list2.append(float(row.split(',')[1]))
                except:
                    pass
        return list2

    def func(time_series):
        y = FloatVector(time_series)
        transformed_y = R('transform_series')(y, take_log=True, pcode="p1")
        result = R('bnf')(transformed_y, demean="dm")
        gc.collect()  # using Python's garage collector to free up unnecessary use of R memory space
        return result

    bnf_output = func(US_GDP_test_data())

    return jsonify([v for v in bnf_output.rx2('cycle')])
