from python_to_r_interface.TimeSeries import *


# Use only for testing
class TestTimeSeries(TimeSeries):
    test_data_series = ("DATE", "GDPC1", "cpiaucsl", "GDPDEF", "UNRATE")

    def __init__(self, r_instance, time_series_name_abbr=test_data_series[0]):
        super().__init__(r_instance, [])

        if time_series_name_abbr not in TestTimeSeries.test_data_series:
            raise ValueError("Invalid time series. Expected one of: %s" % (TestTimeSeries.test_data_series,))

        t_s = []
        with open(FILTER_FILEPATH + "us_data.csv") as f:
            for row in f:
                try:
                    t_s.append(float(row.split(',')[time_series_name_abbr.index(time_series_name_abbr) + 1]))
                    # + 1 to skip date column
                except:
                    ...
        self.y = FloatVector(t_s)

    def set_transformation_defaults(self):
        self.p_code = "p1"
        self.d_code = "nd"
        self.take_log = True
