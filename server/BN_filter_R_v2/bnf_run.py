import gc
import os

os.environ['R_HOME'] = 'C:/Program Files/R/R-4.0.2'  # must be set before rpy2 import
import rpy2.robjects as robj
from rpy2.robjects.vectors import FloatVector

R = robj.r
R.source("bnf_fcns.R")


def US_GDP_test_data():
    us_gdp_data = []
    with open("us_data.csv") as f:
        for row in f:
            try:
                us_gdp_data.append(float(row.split(',')[1]))
            except:
                pass
    return us_gdp_data


def func(time_series):
    y = FloatVector(time_series)
    transformed_y = R('transform_series')(y, take_log=True, pcode="p1")
    result = R('bnf')(transformed_y, demean="dm")
    gc.collect()  # using Python's garbage collector to free up unnecessary use of R memory space
    return result


bnf_output = func(US_GDP_test_data())

print([v for v in bnf_output.rx2('cycle')])
