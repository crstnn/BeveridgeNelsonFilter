from GLOBAL_imp import *
from python_to_r_interface.TestTimeSeries import *
from python_to_r_interface.FREDTimeSeries import *
from python_to_r_interface.UserTimeSeries import *
from python_to_r_interface.Bnf import *
from pathlib import Path

app = Flask(__name__)

CURR_FILEPATH = str(Path(__file__).parents[0])


@app.route('/')
def index():
    return "alive"


@app.route('/fred-time-series', methods=['GET'])
def fred_time_series():
    R = robj.r
    R.source(CURR_FILEPATH + FILTER_FILEPATH + BNF_FUNCTIONS)
    fred_series = FREDTimeSeries(R)

    bnf = BNF(fred_series, R)

    return jsonify(bnf.run())


@app.route('/user-specified-time-series', methods=['GET'])
def user_specified_time_series():
    window = request.args.get("window")
    delta_select = request.args.get("delta_select")
    fixed_delta = request.args.get("fixed_delta")
    ib = request.args.get("ib")
    demean = request.args.get("demean")

    user_y = request.data.get("processed_y")

    R = robj.r
    R.source(CURR_FILEPATH + FILTER_FILEPATH + BNF_FUNCTIONS)
    user_series = UserTimeSeries(R, user_y)

    if bool(request.args.get("transform")):
        user_series.d_code = request.args.get("d_code")
        user_series.p_code = request.args.get("p_code")
        user_series.take_log = request.args.get("take_log")

    bnf = BNF(user_series, R, window, delta_select, fixed_delta, ib, demean)

    return jsonify(bnf.run())


@app.route('/test-time-series', methods=['GET'])
def test_time_series():
    R = robj.r
    R.source(CURR_FILEPATH + FILTER_FILEPATH + BNF_FUNCTIONS)
    us_gdp = TestTimeSeries(R)  # default GDPC1
    us_gdp.set_default_transformation()
    bnf = BNF(us_gdp,
              R,
              window=40,
              delta_select=2,
              fixed_delta=0.05,
              ib=True,
              demean="dm"
              )

    return jsonify(bnf.run())
