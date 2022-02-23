class BNF:
    def __init__(self, time_series,
                 r_instance, window, delta_select, fixed_delta, ib, demean):
        self.time_series = time_series.get_transformed_series()
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
                                            ib=self.demean)

        return [v for v in bnf_output.rx2('cycle')]
