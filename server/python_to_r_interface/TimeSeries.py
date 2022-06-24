import gc
from rpy2.robjects.vectors import FloatVector


class TimeSeries:
    # transformation types
    D_CODES = ("nd", "d1", "d4", "d12")
    P_CODES = ("np", "p1", "p4", "p12")

    def __init__(self, time_series):
        self.set_transformation_defaults()
        self._y = time_series
        self._y_float_vector = None
        self.d_code = None
        self.p_code = None
        self.take_log = None
        self._transform = False

    def set_transformation_defaults(self):
        self.d_code = TimeSeries.D_CODES[0]
        self.p_code = TimeSeries.P_CODES[0]
        self._transform = self.take_log = False

    def set_transformation(self, d_code, p_code, take_log):
        self.d_code = d_code
        self.p_code = p_code
        self.take_log = take_log

    def check_for_transformation(self):
        self._transform = self._d_code is not None or self._p_code is not None or self._take_log is not None

    @property
    def d_code(self):
        if self._d_code is None:
            return TimeSeries.D_CODES[0]
        return self._d_code

    @d_code.setter
    def d_code(self, d):
        if d not in TimeSeries.D_CODES and d is not None:
            raise ValueError("Invalid d_code type. Expected one of: %s" % (TimeSeries.D_CODES,))
        self._d_code = d
        self.check_for_transformation()

    @property
    def p_code(self):
        if self._p_code is None:
            return TimeSeries.P_CODES[0]
        return self._p_code

    @p_code.setter
    def p_code(self, p):
        if p not in TimeSeries.P_CODES and p is not None:
            raise ValueError("Invalid p_code type. Expected one of: %s" % (TimeSeries.P_CODES,))
        self._p_code = p
        self.check_for_transformation()

    @property
    def take_log(self):
        if self._take_log is None:
            return False
        return self._take_log

    @take_log.setter
    def take_log(self, l):
        if type(l) is not bool and l is not None:
            raise TypeError("Invalid take_log type, Expected type: Boolean or None")
        self._take_log = l
        self.check_for_transformation()

    def get_raw_untransformed_time_series(self):
        return self._y

    def get_time_series_float_vec(self, r_instance):
        if self._transform and not self._y_float_vector:
            self._y_float_vector = FloatVector(self._y)
            # transformed series
            ret_series = r_instance('transform_series')(y=self._y_float_vector,
                                                        take_log=self.take_log,
                                                        dcode=self.d_code,
                                                        pcode=self.p_code)
            gc.collect()  # using Python's garbage collector to free up unnecessary use of R memory space
            return ret_series

        return self._y_float_vector
