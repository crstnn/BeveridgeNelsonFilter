import requests

from GLOBAL_imp import FRED_BASE_URL, FRED_API_KEY


class FREDTimeSeriesInfo:
    FRED_INFO_URL = FRED_BASE_URL + '/series'

    def __init__(self, name_abbr):
        self.time_series_name_abbr = name_abbr
        self._get_time_series_information()

    def _get_time_series_information(self):
        parameters = {
            'series_id': self.time_series_name_abbr,
            'api_key': FRED_API_KEY,
        }
        series_info = requests.get(FREDTimeSeriesInfo.FRED_INFO_URL, params=parameters).json()['seriess']

        self.observation_start = series_info['observation_start']
        self.observation_end = series_info['observation_end']
        self.min_freq = series_info['frequency_short']
