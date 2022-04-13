from GLOBAL_imp import *
from python_to_r_interface.TestTimeSeries import *
from python_to_r_interface.FREDTimeSeries import *
from python_to_r_interface.Bnf import *
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000",
                    "https://crstnn.github.io",
                    "https://bnfiltering.com"]
    }
})


# Design note: lightweight backend validation as the majority of validation is done in frontend

def get_r_inst():
    R = robj.r
    R.source(FILTER_FILEPATH + BNF_FUNCTIONS)
    return R


def handle_params_bnf_args():
    # empty string for 'window' occurs when set to 'static demeaning' so we set it to an arbitrary 40
    window = 40 if request.args.get("window") else int(request.args.get("window"))
    delta_select = int(request.args.get("delta_select"))
    fixed_delta = float(request.args.get("fixed_delta")) if request.args.get("fixed_delta") else 0.05
    ib = request.args.get("ib") == "true"
    demean = request.args.get("demean")

    return window, delta_select, fixed_delta, ib, demean


def handle_params_series_transformation(series):
    if request.args.get("transform") == "true":
        series.set_transformation(request.args.get("d_code"),
                                  request.args.get("d_code"),
                                  request.args.get("take_log") == "true")


@app.route('/')
def index():
    return "alive"


@app.route('/fred-time-series', methods=['GET'])
def fred_time_series():
    ...


@app.route('/bnf/fred-time-series', methods=['GET'])
def bnf_fred_time_series():
    fred_abbr = request.args.get("fred_abbr")
    freq = request.args.get("freq")
    obs_start = request.args.get("obs_start")

    fred_series = FREDTimeSeries(fred_abbr, freq, obs_start)

    handle_params_series_transformation(fred_series)

    bnf = BNF(fred_series, get_r_inst(), *handle_params_bnf_args())

    return jsonify(bnf.run())


@app.route('/bnf/user-specified-time-series', methods=['GET'])
def bnf_user_specified_time_series():
    # Design Note: Time series data is a comma delimited string in the URL parameters
    # for huge time series this may be problematic due to URL length limits (as we cannot send
    # this data in the body because GET requests do not have bodies).
    # May need to change to POST if this poses a problem in the future.
    user_y = request.args.get("processed_y").split(",")

    user_series = TimeSeries(user_y)
    handle_params_series_transformation(user_series)

    bnf = BNF(user_series, get_r_inst(), *handle_params_bnf_args())

    return jsonify(bnf.run())


@app.route('/bnf/test-time-series', methods=['GET'])
def bnf_test_time_series():
    us_gdp = TestTimeSeries()  # default GDPC1
    us_gdp.set_transformation_defaults()
    bnf = BNF(us_gdp, get_r_inst(), window=40, delta_select=2, fixed_delta=0.05, ib=True, demean="dm")

    return jsonify(bnf.run())
