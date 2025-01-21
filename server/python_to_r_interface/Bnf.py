import gc

from python_to_r_interface.utils import convert_to_float, create_int_array


class BNF:
    def __init__(self, time_series,
                 r_instance, window, delta_select, delta, ib, demean, outliers_for_se):
        self.r_instance = r_instance

        # data
        self.time_series_float_vector = time_series.get_post_transform_time_series(self.r_instance)

        # parameters
        self.window = 40 if window is None or demean == 'sm' else int(window)
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

        self.return_adjusted_bands = bool(outliers_for_se)
        self.outliers_for_se = create_int_array(outliers_for_se if self.return_adjusted_bands else [])
        self.dynamic_bands = self.iterative != 0

        # outputs (of interest)
        self.cycle = self.trend = self.cycle_ci = self.cycle_ci_adjusted = None

    def run(self):
        bnf_output = self.r_instance('bnf')(self.time_series_float_vector,
                                            iterative=self.iterative,
                                            window=self.window,
                                            delta_select=self.delta_select,
                                            fixed_delta=self.delta,
                                            d0=self.d0,
                                            demean=self.demean,
                                            adjusted_bands=self.return_adjusted_bands,
                                            outliers=self.outliers_for_se,
                                            dynamic_bands=self.dynamic_bands,
                                            ib=self.ib,
                                            )

        self.trend = [convert_to_float(v) for v in bnf_output.rx2('trend')]
        self.cycle = [convert_to_float(v) for v in bnf_output.rx2('cycle')]
        self.cycle_ci = [convert_to_float(v) for v in bnf_output.rx2('cycle_ci')]
        if self.return_adjusted_bands:
            self.cycle_ci_adjusted = [convert_to_float(v) for v in bnf_output.rx2('cycle_ci_adjusted')]
        self.delta = convert_to_float(bnf_output.rx2('delta')[0])

        # using both garbage collectors to free up space that rpy2 hogs after running ops
        self.r_instance('gc()')
        gc.collect()

    def get_result_dict(self):
        return {
            "trend": self.trend,
            "cycle": self.cycle,
            "cycle_ci": self.cycle_ci,
            **({"cycle_ci_adjusted": self.cycle_ci_adjusted} if self.return_adjusted_bands else {}),
            "delta": self.delta
        }
