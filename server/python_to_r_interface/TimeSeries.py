from abc import ABC, abstractmethod
from GLOBAL_imp import *
from pathlib import Path
from rpy2.robjects.vectors import FloatVector


# ABSTRACT CLASS
class TimeSeries(ABC):

    # transformation types
    d_code_types = ("nd", "d1", "d4", "d12")
    p_code_types = ("np", "p1", "p4", "p12")

    def __init__(self, r_instance, time_series):
        self.r_instance = r_instance

        # defaults
        self.d_code = TimeSeries.d_code_types[0]
        self.p_code = TimeSeries.p_code_types[0]
        self.take_log = False
        self.transform = False
        self.y = FloatVector(time_series)

    @property
    def y(self):
        return self._y

    @y.setter
    def y(self, value):
        self._y = value

    @property
    def d_code(self):
        return self._d_code

    @d_code.setter
    def d_code(self, d):
        if d not in TimeSeries.d_code_types and d is not None:
            raise ValueError("Invalid d_code type. Expected one of: %s" % (TimeSeries.d_code_types,))
        self._d_code = d
        self._transform = True

    @property
    def p_code(self):
        return self._p_code

    @p_code.setter
    def p_code(self, p):
        if p not in TimeSeries.p_code_types and p is not None:
            raise ValueError("Invalid p_code type. Expected one of: %s" % (TimeSeries.p_code_types,))
        self._p_code = p
        self._transform = True

    @property
    def take_log(self):
        return self._take_log

    @take_log.setter
    def take_log(self, l):
        if type(l) is not bool and l is not None:
            raise TypeError("Invalid take_log type, Expected type: Boolean or None")
        self._take_log = l
        self._transform = True

    @property
    def transform(self):
        return self._transform

    @transform.setter
    def transform(self, value):
        self._transform = value

    def get_time_series(self):
        if self.d_code is not None or self.p_code is not None or self.take_log is not None:
            # untransformed series
            ret_series = self.r_instance('transform_series')(y=self.y,
                                                             take_log=self.take_log,
                                                             dcode=self.d_code,
                                                             pcode=self.p_code)
            gc.collect()  # using Python's garage collector to free up unnecessary use of R memory space
            return ret_series

        return self.y

    def _json_to_list(self):
        pass

    def _check_valid_input(self):
        pass
