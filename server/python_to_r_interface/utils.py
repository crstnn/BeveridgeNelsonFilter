from array import array
from math import isnan

create_float_array = lambda d: array('f', d)

convert_to_float = lambda v: float(v) if not isnan(v) else None
