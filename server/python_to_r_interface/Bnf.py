import gc


class BNF:
    def __init__(self, time_series,
                 r_instance, window, delta_select, delta, ib, demean):
        self.r_instance = r_instance

        # data
        self.time_series_float_vector = time_series.get_post_transform_time_series(self.r_instance)

        # parameters
        self.window = window
        self.delta_select = delta_select
        self.delta = delta if delta_select == 0 else 0  # else: arbitrary value
        self.d0 = delta if delta_select != 0 else 0  # else: arbitrary value
        self.ib = ib
        self.demean = demean

        if demean == "idm":
            self.demean = 'dm'
            self.iterative = 100
        elif demean == "dm":
            self.iterative = 1
        else:
            self.iterative = 0

        self.dynamic_bands = self.iterative != 0

        # outputs (of interest)
        self.cycle = self.trend = self.ci = None

    def run(self):
        bnf_output = self.r_instance('bnf')(self.time_series_float_vector,
                                            iterative=self.iterative,
                                            window=self.window,
                                            delta_select=self.delta_select,
                                            fixed_delta=self.delta,
                                            d0=self.d0,
                                            demean=self.demean,
                                            dynamic_bands=self.dynamic_bands,
                                            ib=self.ib,
                                            )

        self.trend = [float(v) for v in bnf_output.rx2('trend')]
        self.cycle = [float(v) for v in bnf_output.rx2('cycle')]
        self.ci = [float(v) for v in bnf_output.rx2('ci')]
        self.delta = bnf_output.rx2('delta')[0]

        # using both garbage collectors to free up space that rpy2 hogs after running ops
        self.r_instance('gc()')
        gc.collect()

    def get_result_dict(self):
        return {
            "trend": self.trend,
            "cycle": self.cycle,
            "ci": self.ci,
            "delta": self.delta
        }
