import requests

from GLOBAL_imp import FRED_API_KEY, FRED_OBS_URL
from python_to_r_interface.TimeSeries import *


class FREDTimeSeries(TimeSeries):
    FRED_FREQUENCIES = ('d', 'w', 'bw', 'm', 'q', 'sa', 'a')

    def __init__(self, time_series_name_abbr, frequency, obs_start=None, obs_end=None, time_series=None):
        super().__init__(time_series)
        self.time_series_name_abbr = time_series_name_abbr
        self.frequency = frequency
        self.obs_start = obs_start
        self.obs_end = obs_end

    @property
    def frequency(self):
        return self._frequency

    @frequency.setter
    def frequency(self, f):
        if f not in FREDTimeSeries.FRED_FREQUENCIES and f is not None:
            raise ValueError(f"Invalid FRED FREQUENCY type. Expected one of: %{FREDTimeSeries.FRED_FREQUENCIES}")
        self._frequency = f

    def _FRED_API_GET(self):
        parameters = {
            'series_id': self.time_series_name_abbr,
            'api_key': FRED_API_KEY,
            'file_type': 'json',
            'frequency': self.frequency,
            # get as many observations as possible
            'limit': 100000,  # upper bound
            'sort_order': 'asc'
        }
        self.FRED_response = requests.get(FRED_OBS_URL, params=parameters)

    def _get_obs_list(self):
        obs = list(map(lambda o: o.json()['observations'], self.FRED_response))
        get_curr_FRED_obs_list = lambda o: lambda ob_idx: o[ob_idx]['value'] \
            if ob_idx < len(o) and o[ob_idx]['value'] != '.' else ''
