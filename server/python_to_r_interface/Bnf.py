class BNF:
    def __init__(self, time_series, r_instance):
        self.time_series = time_series
        self.r_instance = r_instance

    def run(self):
        bnf_output = self.r_instance('bnf')(self.time_series, demean="dm")
        return [v for v in bnf_output.rx2('cycle')]
