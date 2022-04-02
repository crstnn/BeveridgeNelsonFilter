import os
import gc

if 'ON_SERVER' in os.environ:
    print("flask_prod")
else:  # ON_LOCAL
    print("flask_dev")
    os.environ['R_HOME'] = 'C:\\Program Files\\R\\R-4.0.2'  # adjust to local directory
    # must be set before rpy2 import
    # may be only necessary locally


import rpy2.robjects as robj
from rpy2.robjects.vectors import FloatVector

FILTER_FILEPATH = "./BN_filter_R_v2/"
BNF_FUNCTIONS = "bnf_fcns.R"
