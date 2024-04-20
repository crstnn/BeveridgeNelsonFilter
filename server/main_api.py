from flask import Flask, jsonify, request
from flask_cors import CORS

from global_config import *
from python_to_r_interface.Bnf import *
from python_to_r_interface.FREDTimeSeries import *
from python_to_r_interface.FREDTimeSeriesInfo import FREDTimeSeriesInfo
from python_to_r_interface.TestTimeSeries import *

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
    r = robj.r
    r.source(FILTER_FILEPATH + BNF_FUNCTIONS)
    return r


R = get_r_inst()


def get_fred_abbr():
    return request.args.get("fred_abbr")


def get_fred_params():
    fred_abbr = get_fred_abbr()
    freq = request.args.get("freq")
    obs_start = request.args.get("obs_start")
    obs_end = request.args.get("obs_end")

    return fred_abbr, freq, obs_start, obs_end


def get_bnf_params():
    delta_select = int(request.args.get("delta_select"))

    # fixed_delta_arg = request.args.get("fixed_delta", None)
    # fixed_delta = float(fixed_delta_arg) if fixed_delta_arg is not None and delta_select == 0 else 0.005

    delta = float(request.args.get("delta"))

    ib = request.args.get("ib") == "true"
    demean = request.args.get("demean")

    window_arg = request.args.get("window", None)
    window = 40 if window_arg is None or demean == 'sm' else int(window_arg)

    return window, delta_select, delta, ib, demean


def handle_series_transformation_params(series):
    if request.args.get("transform") == "true":
        series.set_transformation(d_code=request.args.get("d_code"),
                                  p_code=request.args.get("p_code"),
                                  take_log=request.args.get("take_log") == "true")


@app.route('/')
def index():
    return "alive"


@app.route('/fred-time-series', methods=['GET'])
def fred_time_series():
    fred_series = FREDTimeSeriesInfo(get_fred_abbr())

    return jsonify(fred_series.get_information_dict())


@app.route('/bnf/fred-time-series', methods=['GET'])
def bnf_fred_time_series():
    fred_series = FREDTimeSeries(*get_fred_params())
    handle_series_transformation_params(fred_series)

    bnf = BNF(fred_series, R, *get_bnf_params())
    bnf.run()

    return jsonify(fred_series.get_series_dict() | bnf.get_result_dict())


@app.route('/bnf/user-specified-time-series', methods=['GET'])
def bnf_user_specified_time_series():
    # Design Note: Time series data is a comma delimited string in the URL parameters
    # for huge time series this may be problematic due to URL length limits (as we cannot send
    # this data in the body because GET requests do not have bodies).
    # May need to change to POST if this poses a problem in the future.
    user_y = [float(i) for i in request.args.get("processed_y").split(",")]

    user_series = TimeSeries(user_y)
    handle_series_transformation_params(user_series)

    bnf = BNF(user_series, R, *get_bnf_params())
    bnf.run()

    return jsonify(user_series.get_series_dict(), bnf.get_result_dict())


@app.route('/bnf/test-time-series', methods=['GET'])
def bnf_test_time_series():
    us_gdp = TestTimeSeries()  # default GDPC1
    us_gdp.set_transformation_defaults()

    bnf = BNF(us_gdp, R, window=40, delta_select=2, delta=0.05, ib=True, demean="dm")
    bnf.run()

    res = jsonify(bnf.get_result_dict())

    return res
