import os
import configparser

if 'ON_SERVER' in os.environ:
    print("flask_prod")

    FRED_API_KEY = os.environ['FRED_API_KEY'] if 'FRED_API_KEY' in os.environ else ''

else:  # ON LOCAL
    print("flask_dev")
    os.environ['R_HOME'] = 'C:\\Program Files\\R\\R-4.0.2'  # adjust to local directory
    # must be set before rpy2 import
    # may be only necessary locally

    config = configparser.ConfigParser()
    config.read('config.ini')
    FRED_API_KEY = config['KEY']['FRED_API_KEY'] if 'FRED_API_KEY' in config else ''


import rpy2.robjects as robj
from rpy2.robjects.vectors import FloatVector

FILTER_FILEPATH = "./BN_filter_R_v2/"
BNF_FUNCTIONS = "bnf_fcns.R"

FRED_BASE_URL = 'https://api.stlouisfed.org/fred'
