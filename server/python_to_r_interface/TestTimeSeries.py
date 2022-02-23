from python_to_r_interface.TimeSeries import *


# Use only for testing
class TestTimeSeries(TimeSeries):
    test_data_series = ("DATE", "GDPC1", "cpiaucsl", "GDPDEF", "UNRATE")

    def __init__(self, r_instance, time_series=test_data_series[0]):
        super().__init__(r_instance, time_series)

        if time_series not in TestTimeSeries.test_data_series:
            raise ValueError("Invalid time series. Expected one of: %s" % (TestTimeSeries.test_data_series,))

        self.y = []
        with open(self.CURR_FILTER_FILEPATH + "us_data.csv") as f:
            for row in f:
                try:
                    self.y.append(float(row.split(',')[time_series.index(time_series)+1]))
                    # + 1 to skip date column
                except:
                    pass
        self.y = FloatVector(self.y)

    def set_default_transformation(self):
        self._p_code = "p1"
        self._d_code = "nd"
        self._take_log = True
