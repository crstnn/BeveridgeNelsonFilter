import requests

from GLOBAL_imp import FRED_API_KEY, FRED_OBS_URL, FRED_FREQUENCIES
from python_to_r_interface.TimeSeries import *


class FREDTimeSeries(TimeSeries):

    def __init__(self, time_series_name_abbr, frequency, obs_start=None, obs_end=None):
        super().__init__(None)
        self.time_series_name_abbr = time_series_name_abbr
        self.frequency = frequency
        self.obs_start = obs_start
        self.obs_end = obs_end

        self._FRED_API_GET()
        self._create_obs_list()

    @property
    def frequency(self):
        return self._frequency

    @frequency.setter
    def frequency(self, f):
        if f not in FRED_FREQUENCIES and f is not None:
            raise ValueError(f"Invalid FRED FREQUENCY type. Expected one of: %{FRED_FREQUENCIES}")
        self._frequency = f

    def _FRED_API_GET(self):
        parameters = {
            'series_id': self.time_series_name_abbr,
            'api_key': FRED_API_KEY,
            'file_type': 'json',
            'frequency': self.frequency,
            # get as many observations as possible
            'limit': 100000,  # upper bound
            'sort_order': 'asc',
            'observation_start': self.obs_start,
            'observation_end': self.obs_end,
        }

        self.FRED_response = requests.get(FRED_OBS_URL, params=parameters).json()

    def _create_obs_list(self):
        self._y = []
        self.dates = []
        for idx, o in enumerate(self.FRED_response['observations']):
            if o['value'] != '.':  # FRED occasionally has a bug where they return a '.' in a series
                self._y.append(float(o['value']))
                self.dates.append(o['date'])

    def get_series_dict(self):
        return {
            'dates': self.dates,
            'y': self._y,
        }
