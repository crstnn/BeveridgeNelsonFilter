from array import array
from math import isnan

create_float_array = lambda d: array('f', d)
create_int_array = lambda d: array('i', d)

convert_to_float = lambda v: float(v) if not isnan(v) else None
