from python_to_r_interface.TimeSeries import *


class FREDTimeSeries(TimeSeries):
    def __init__(self, r_instance, time_series):
        super().__init__(r_instance, time_series)
