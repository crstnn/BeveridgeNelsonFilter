import requests
from python_to_r_interface.TimeSeries import *


class FREDTimeSeries(TimeSeries):
    FRED_API_KEY = os.environ['FRED_API_KEY']
    FRED_API_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations'

    def __init__(self, r_instance, time_series):
        super().__init__(r_instance, time_series)

    def _FRED_API_GET(self, series_ID, frequency, obs_start):
        parameters = {
            'series_id': series_ID,
            'api_key': FREDTimeSeries.FRED_API_KEY,
            'file_type': 'json',
            'frequency': frequency,
            'observation_start': obs_start,
            'limit': 100000,  # arbitrary limit
            'sort_order': 'asc'
        }
        self.FRED_response = requests.get(FREDTimeSeries.FRED_API_BASE_URL, params=parameters)

    def _get_obs_list(self):
        d = list(map(lambda o: o.json()['observations'], self.FRED_response))
        get_curr_FRED_obs_list = lambda o: lambda ob_idx: o[ob_idx]['value'] \
            if ob_idx < len(o) and o[ob_idx]['value'] != '.' else ''
