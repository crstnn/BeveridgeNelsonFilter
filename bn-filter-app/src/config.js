const SERVER_ERROR = <>
    During the running of the BN filter a problem occurred.{' '}
    Check that the selected options are appropriate for the time series{' '}
    (e.g. different transformations or if minimum delta is low enough) or consider simpler settings (e.g. no confidence
    intervals, fixed delta, static demeaning).{' '}
    MATLAB or R code for the BN filter is available at this <a target="_blank" rel="noopener noreferrer"
                                                               href="https://sites.google.com/site/jamescmorley/code#:~:text=Beveridge%2DNelson%20Filter">link</a>.
</>

const SERVER_TIMEOUT = <>
    Request has taken too long. Consider reducing the computational cost by adjusting the inputs or coming back
    later.{' '}
    Alternatively, MATLAB or R code for the BN filter is available at this <a target="_blank" rel="noopener noreferrer"
                                                                              href="https://sites.google.com/site/jamescmorley/code#:~:text=Beveridge%2DNelson%20Filter">link</a>.
</>

export const CONFIG = Object.freeze({
    "field": {
        "optionField": {
            "frequencyManual": {
                "option": [
                    {
                        "value": "w",
                        "text": "Weekly"
                    },
                    {
                        "value": "m",
                        "text": "Monthly"
                    },
                    {
                        "value": "q",
                        "text": "Quarterly"
                    },
                    {
                        "value": "a",
                        "text": "Annual"
                    },
                    {
                        "value": "n",
                        "text": "Undated/Unspecified"
                    }
                ],
                "default": "q"
            },
            "frequencyFRED": {
                "option": [
                    {
                        "value": "d",
                        "text": "Daily"
                    },
                    {
                        "value": "w",
                        "text": "Weekly"
                    },
                    {
                        "value": "b",
                        "text": "Bi-Weekly"
                    },
                    {
                        "value": "m",
                        "text": "Monthly"
                    },
                    {
                        "value": "q",
                        "text": "Quarterly"
                    },
                    {
                        "value": "sa",
                        "text": "Semiannual"
                    },
                    {
                        "value": "a",
                        "text": "Annual"
                    }
                ],
                "default": ""
            },
            "iterativeDynamicDemeaning": {
                "option": [
                    {
                        "value": "nd",
                        "text": "No Demeaning (Zero Drift)",
                        "hoverText": "Estimate zero drift"
                    },
                    {
                        "value": "sm",
                        "text": "Static Demeaning (Constant Drift)",
                        "hoverText": "Estimate constant drift"
                    },
                    {
                        "value": "dm",
                        "text": "Dynamic Demeaning (Changing Drift)",
                        "hoverText": "Estimate time-varying drift using rolling window"
                    },
                    {
                        "value": "idm",
                        "text": "Iterative Dynamic Demeaning",
                        "hoverText": "Iteratively estimate time-varying drift removing cycle and using rolling window according to KMW refinement"
                    }
                ],
                "default": "idm"
            },
            "deltaSelect": {
                "option": [
                    {
                        "value": 0,
                        "text": "Fixed Delta",
                        "hoverText": "Signal-to-Noise Ratio according to user input"
                    },
                    {
                        "value": 1,
                        "text": "Maximize Amplitude-to-Noise Ratio",
                        "hoverText": "Signal-to-Noise Ratio according to benchmark KMW approach"
                    },
                    {
                        "value": 2,
                        "text": "Minimize Stochastic Trend Volatility",
                        "hoverText": "Signal-to-Noise Ratio according to KMW refinement"
                    }
                ],
                "default": 0
            },
            "dCode": {
                "option": [
                    {
                        "value": "nd",
                        "text": "No Differencing (Levels)"
                    },
                    {
                        "value": "d1",
                        "text": "1 Period Difference"
                    },
                    {
                        "value": "d4",
                        "text": "4 Period Difference (for Quarterly Data)"
                    },
                    {
                        "value": "d12",
                        "text": "12 Period Difference (for Monthly Data)"
                    }
                ],
                "default": "nd"
            },
            "pCode": {
                "option": [
                    {
                        "value": "np",
                        "text": "No Change"
                    },
                    {
                        "value": "p1",
                        "text": "Multiply by 100"
                    },
                    {
                        "value": "p4",
                        "text": "Multiply by 400 (Annualized Quarterly Rate)"
                    },
                    {
                        "value": "p12",
                        "text": "Multiply by 1200 (Annualized Monthly Rate)"
                    }
                ],
                "default": "p1"
            }
        },
        "freeText": {
            "delta": {
                "default": 0.01,
                "min": 0.0005,
                "max": null
            },
            "rollingWindow": {
                "default": 40,
                "min": 26,
                "max": 500
            }
        }
    },
    "alertErrors": {
        "INPUT_USER_M": "The FRED mnemonic input is either empty or incorrect. Check the mnemonic.",
        "INPUT_USER_S": "The user inputted series is either empty or incorrect. Check the data for the series.",
        "INPUT_PARAM": "At least one of the parameters does not meet the requirements. Check that the parameters are appropriate.",
        "SERVER": SERVER_ERROR,
        "TIMEOUT": SERVER_TIMEOUT,
    },
    "URL": {
        "baseBackendURL": "https://bn-filtering.herokuapp.com",
        "bnfUserSpecifiedDataSlug": "/bnf/user-specified-time-series",
        "bnfFredDataSlug": "/bnf/fred-time-series",
        "fredDataSlug": "/fred-time-series"
    }
});
