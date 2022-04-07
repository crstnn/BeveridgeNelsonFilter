import requests
from python_to_r_interface.TimeSeries import *


class FREDTimeSeries(TimeSeries):
    FRED_API_KEY = os.environ['FRED_API_KEY'] if 'FRED_API_KEY' in os.environ else ''
    FRED_API_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations'
    FRED_FREQUENCIES = ('d', 'w', 'bw', 'm', 'q', 'sa', 'a')

    def __init__(self, time_series_name_abbr, frequency, obs_start):
        self.time_series_name_abbr = time_series_name_abbr
        self.frequency = frequency
        self.obs_start = obs_start
        self.set_defaults()

    def set_R_instance(self, r_instance):
        self.r_instance = r_instance

    def conv_series_to_R_vec(self):
        self.y = FloatVector(self.y)

    @property
    def frequency(self):
        return self._frequency

    @frequency.setter
    def frequency(self, f):
        if f not in FREDTimeSeries.FRED_FREQUENCIES and f is not None:
            raise ValueError("Invalid FRED FREQUENCY type. Expected one of: %s" % (FREDTimeSeries.FRED_FREQUENCIES,))
        self._frequency = f

    def _FRED_API_GET(self):
        parameters = {
            'series_id': self.time_series_name_abbr,
            'api_key': FREDTimeSeries.FRED_API_KEY,
            'file_type': 'json',
            'frequency': self.frequency,
            'observation_start': self.obs_start,
            'limit': 100000,  # arbitrary limit
            'sort_order': 'asc'
        }
        self.FRED_response = requests.get(FREDTimeSeries.FRED_API_BASE_URL, params=parameters)

    def _get_obs_list(self):
        d = list(map(lambda o: o.json()['observations'], self.FRED_response))
        get_curr_FRED_obs_list = lambda o: lambda ob_idx: o[ob_idx]['value'] \
            if ob_idx < len(o) and o[ob_idx]['value'] != '.' else ''


