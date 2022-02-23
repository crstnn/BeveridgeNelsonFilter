from GLOBAL_imp import *
from python_to_r_interface.TestTimeSeries import *
# from python_to_r_interface.FREDTimeSeries import *
# from python_to_r_interface.UserTimeSeries import *
from python_to_r_interface.Bnf import *
from pathlib import Path

app = Flask(__name__)

CURR_FILEPATH = str(Path(__file__).parents[0])


@app.route('/')
def index():
    return "alive"


@app.route('/fred-time-series')
def fred_time_series():
    R = robj.r
    R.source(CURR_FILEPATH + FILTER_FILEPATH + BNF_FUNCTIONS)
    user_series = FREDTimeSeries(r_instance=R)
    user_series.set_default_transformation()

    bnf = BNF(user_series.get_time_series(), r_instance=R)

    return jsonify(bnf.run())


@app.route('/user-specified-time-series')
def user_specified_time_series():
    R = robj.r
    R.source(CURR_FILEPATH + FILTER_FILEPATH + BNF_FUNCTIONS)
    user_series = UserTimeSeries(r_instance=R)
    user_series.set_default_transformation()

    bnf = BNF(user_series.get_time_series(), r_instance=R)

    return jsonify(bnf.run())


@app.route('/test-time-series')
def test_time_series():
    R = robj.r
    R.source(CURR_FILEPATH + FILTER_FILEPATH + BNF_FUNCTIONS)
    us_gdp = TestTimeSeries(r_instance=R)  # default GDPC1
    us_gdp.set_default_transformation()
    bnf = BNF(us_gdp.get_time_series(), r_instance=R)

    return jsonify(bnf.run())
