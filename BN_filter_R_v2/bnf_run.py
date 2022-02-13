import rpy2.robjects as robj


def func(param):
    r = robj.r
    r.source("bnf_fcns.R")
    result = r('my_func')(param)
    return result


a = func(12)  # calling the function with passing arguments
