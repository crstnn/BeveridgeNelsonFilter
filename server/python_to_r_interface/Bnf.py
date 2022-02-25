import gc

class BNF:
    def __init__(self, time_series,
                 r_instance, window, delta_select, fixed_delta, ib, demean):
        self.time_series = time_series.get_time_series()
        self.r_instance = r_instance
        self.window = window
        self.delta_select = delta_select
        self.fixed_delta = fixed_delta
        self.demean = demean
        self.ib = ib

    def run(self):
        bnf_output = self.r_instance('bnf')(self.time_series,
                                            window=self.window,
                                            delta_select=self.delta_select,
                                            fixed_delta=self.fixed_delta,
                                            demean=self.demean,
                                            ib=self.ib)
        gc.collect()  # using Python's garage collector to free up unnecessary use of R memory space
        return {
            "cycle": [str(v) for v in bnf_output.rx2('cycle')],
            "cycleSE": [str(v) for v in bnf_output.rx2('cycle_se')]
        }
