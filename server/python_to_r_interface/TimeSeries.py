import gc
from rpy2.robjects.vectors import FloatVector


class TimeSeries:
    # transformation types
    d_code_types = ("nd", "d1", "d4", "d12")
    p_code_types = ("np", "p1", "p4", "p12")

    def __init__(self, time_series):
        self.set_transformation_defaults()
        self._y = time_series
        self._y_float_vector = None

    def set_transformation_defaults(self):
        self.d_code = TimeSeries.d_code_types[0]
        self.p_code = TimeSeries.p_code_types[0]
        self._transform = self.take_log = False

    def set_transformation(self, d_code, p_code, take_log):
        self.d_code = d_code
        self.p_code = p_code
        self.take_log = take_log

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

    def get_raw_untransformed_time_series(self):
        return self._y

    def get_time_series_float_vec(self, r_instance):
        if not (self.d_code is None or self.p_code is None or self.take_log is None):
            self._y_float_vector = FloatVector(self._y)
            # transformed series
            ret_series = r_instance('transform_series')(y=self._y_float_vector,
                                                        take_log=self.take_log,
                                                        dcode=self.d_code,
                                                        pcode=self.p_code)
            gc.collect()  # using Python's garbage collector to free up unnecessary use of R memory space
            return ret_series

        return self._y_float_vector
