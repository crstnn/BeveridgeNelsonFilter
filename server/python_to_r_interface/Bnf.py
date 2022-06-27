import gc


class BNF:
    def __init__(self, time_series,
                 r_instance, window, delta_select, fixed_delta, ib, demean):
        self.r_instance = r_instance
        self.time_series_float_vec = time_series.get_time_series_float_vec(self.r_instance)
        self.window = window
        self.delta_select = delta_select
        self.fixed_delta = fixed_delta
        self.ib = ib
        self.demean = demean
        if demean == "idm":
            self.demean = 'dm'
            self.iterative = 100
        elif demean == "dm":
            self.iterative = 1
        else:
            self.iterative = 0

    def run(self):
        bnf_output = self.r_instance('bnf')(self.time_series_float_vec,
                                            iterative=self.iterative,
                                            window=self.window,
                                            delta_select=self.delta_select,
                                            fixed_delta=self.fixed_delta,
                                            demean=self.demean,
                                            ib=self.ib)

        # using both garbage collectors to free up space that rpy2 hogs after running ops
        self.r_instance('gc()')
        gc.collect()

        return {
            "cycle": [str(v) for v in bnf_output.rx2('cycle')],
            "ci": [str(v) for v in bnf_output.rx2('ci')],
            "delta": bnf_output.rx2('delta')[0]
        }
