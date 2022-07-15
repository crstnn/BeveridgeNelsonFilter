import requests

from GLOBAL_imp import FRED_INFO_URL, FRED_API_KEY, FRED_FREQUENCIES


class FREDTimeSeriesInfo:

    def __init__(self, name_abbr):
        self.time_series_name_abbr = name_abbr

        parameters = {
            'series_id': self.time_series_name_abbr,
            'api_key': FRED_API_KEY,
            'file_type': 'json',
        }
        response = requests.get(FRED_INFO_URL, params=parameters)
        if response.status_code != 200: raise Exception("Bad status (FRED mnemonic not found)")

        series_info = response.json()['seriess'][0]

        self.observation_start = series_info['observation_start']
        self.observation_end = series_info['observation_end']
        self.min_freq = series_info['frequency_short'].lower()

    def get_available_freq(self):
        return FRED_FREQUENCIES[FRED_FREQUENCIES.index(self.min_freq):]

    def get_dates(self):
        return self.observation_start, self.observation_end

    def get_information_dict(self):
        return {
            'start_date': self.observation_start,
            'end_date': self.observation_end,
            'available_frequencies': self.get_available_freq()
        }
