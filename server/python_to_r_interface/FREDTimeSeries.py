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
        return requests.get(FREDTimeSeries.FRED_API_BASE_URL, params=parameters)
