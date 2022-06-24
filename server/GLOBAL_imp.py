import os
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

if 'ON_SERVER' in os.environ:
    print("flask_prod")

    FRED_API_KEY = os.environ['FRED_API_KEY'] if 'FRED_API_KEY' in os.environ else ''

else:  # ON LOCAL
    print("flask_dev")
    os.environ['R_HOME'] = 'C:\\Program Files\\R\\R-4.0.2'  # adjust to local directory
    # must be set before rpy2 import
    # may be only necessary locally
    localConfig = configparser.ConfigParser()
    localConfig.read('local_config.ini')
    FRED_API_KEY = localConfig['KEY']['FRED_API_KEY'] if 'FRED_API_KEY' in localConfig else ''


import rpy2.robjects as robj
from rpy2.robjects.vectors import FloatVector

FILTER_FILEPATH = config['PATH']['FILTER_FILEPATH']
BNF_FUNCTIONS = config['PATH']['BNF_FUNCTIONS']

FRED_OBS_URL = config['URL']['FRED_OBS_URL']
FRED_INFO_URL = config['URL']['FRED_INFO_URL']
