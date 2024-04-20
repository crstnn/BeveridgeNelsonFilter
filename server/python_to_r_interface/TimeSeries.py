import gc

from python_to_r_interface.utils import create_float_array


class TimeSeries:
    # transformation types
    D_CODES = ("nd", "d1", "d4", "d12")
    P_CODES = ("np", "p1", "p4", "p12")

    def __init__(self, time_series):
        self._y = time_series
        self._y_float_vector = self._y_post_transform = None
        self.set_transformation_defaults()

    def set_transformation_defaults(self):
        self._d_code = TimeSeries.D_CODES[0]
        self._p_code = TimeSeries.P_CODES[0]
        self._transform = self.take_log = False

    def set_transformation(self, d_code=None, p_code=None, take_log=None):
        self.d_code = d_code
        self.p_code = p_code
        self.take_log = take_log

    def check_for_transformation(self):
        self._transform = not (
                self.d_code == "nd" and self.p_code == "np" and self.take_log is False)  # no transforms

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

    def get_pre_transform_time_series(self):
        return self._y

    def get_time_series_float_vector(self):
        if not self._y_float_vector:
            self._y_float_vector = create_float_array(self._y)
        return self._y_float_vector

    def get_post_transform_time_series(self, r_instance):
        float_vector = self.get_time_series_float_vector()
        if self._transform and self._y and not self._y_post_transform:
            # transform series
            y_post_transform = r_instance('transform_series')(y=float_vector,
                                                              take_log=self.take_log,
                                                              dcode=self.d_code,
                                                              pcode=self.p_code)

            # using both garbage collectors to free up space that rpy2 hogs after running ops
            r_instance('gc()')
            gc.collect()
            self._y_post_transform = create_float_array(y_post_transform)
        else:
            self._y_post_transform = float_vector

        return self._y_post_transform

    def get_series_dict(self):
        return {
            'original_y': self._y,
            'transformed_y': list(self._y_post_transform)  # may be the same as `original_y` if no transform is applied
        }
