import React, {useEffect, useReducer} from 'react';
import StartMenu from './StartMenu';
import ParametersForm from "./ParametersForm";
import DataForm from "./DataForm";
import DataPlot from "./DataPlot";
import Loading from "./Loading";
import Error from "./Error";
import {CONFIG} from "../config.js";
import {DateAbstract} from "../utils/date";
import {
    confIntZip,
    extractModelParams,
    fetchWithTimeout,
    getDifferencingPeriod,
    pairArrayToParamStr
} from "../utils/utils";
import {FRED, PARAMETERS_STEP, USER} from "../utils/consts";

const {field, URL} = CONFIG;

const BasePage = ({initialState}) => {
    const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
        {
            isDeeplinkApply: false,
            step: 1,
            dataInputType: FRED,
            mnemonic: '',
            unprocessedY: '',
            x: [], // dates
            transformedX: [],
            y: [], // time series
            transformedY: [], // transformed y (only will differ from `y` if a transform is applied)
            delta: field.freeText.delta.default,
            deltaSelect: 2,
            demean: field.optionField.iterativeDynamicDemeaning.default,
            iterativeBackcasting: true,
            rollingWindow: field.freeText.rollingWindow.default,
            frequency: field.optionField.frequencyManual.default, // periodicity
            startDate: null,
            endDate: null,
            startDateFRED: null,
            minDate: null,
            maxDate: null,
            endDateFRED: null,
            availableFrequencies: [],
            frequencyFRED: field.optionField.frequencyFRED.default,
            transform: true, // transforms to data before bnf
            dCode: field.optionField.dCode.default,
            pCode: field.optionField.pCode.default,
            takeLog: true,
            // bnf output (from API)
            cycle: [],
            trend: [],
            displayConfInterval: true,
            cycleCI: [],
            deltaCalc: undefined,
            cycleCILB: [],
            cycleCIUB: [],
            trendCILB: [],
            trendCIUB: [],
            outliersForSE: [],
            alertErrorType: null, // overarching alert text
            fieldErrorMessages: {},
            isLoading: false,
            displaySeriesAndTrend: true,
            displayCycle: true,
            ...initialState,
        }
    );

    const nextStep = () => {
        setState({step: state.step + 1})
    };
    const prevStep = () => {
        setState({step: state.step - 1})
    };

    const cancelLoading = () => {
        setState({isLoading: null})
    }

    const handleChange = input => e => {
        setState({[input]: e.target.value});
    }

    const handleCheckboxChange = input => e => {
        setState({[input]: e.target.checked});
    }

    const setErrorMessage = (input, message) => {
        setState({
            fieldErrorMessages: {
                ...state.fieldErrorMessages,
                [input]: message
            }
        });
    }

    const deleteErrorMessage = input => {
        const fem = {...state.fieldErrorMessages};
        delete fem[input];
        setState({fieldErrorMessages: fem});
    }

    const isEmptyString = (v, input) => {
        if (v === "") {
            setErrorMessage(input, "Must not be empty");
            return true;
        }
        return false;
    }

    const isNotANum = (v, input) => {
        if (isNaN(v)) {
            setErrorMessage(input, "Must be numeric");
            return true;
        }
        return false;
    }

    const isNotAnInt = (v, input) => {
        if ((v % 1) !== 0) {
            setErrorMessage(input, "Must be an integer");
            return true;
        }
        return false;
    }

    const isExceedsMinMax = (v, input) => {
        if (field.freeText[input].min !== null && v < field.freeText[input].min) {
            setErrorMessage(input, `Must be ≥ ${field.freeText[input].min}`);
            return true;
        }
        if (field.freeText[input].max !== null && v > field.freeText[input].max) {
            setErrorMessage(input, `Must be ≤ ${field.freeText[input].max}`);
            return true;
        }
        return false;
    }

    const handleErrorField = isCorrectEntry => (input, v) => {
        if (isCorrectEntry) deleteErrorMessage(input);
        setState({[input]: v});
    }

    const validateField = (arr, input, e) => {
        // functions earlier in the array take precedence. [first_validated...last_validated]
        const v = e.target.value;
        const isIncorrectEntry = arr.reduce((total, currentValue) =>
            total ? true : currentValue(v, input) || total, false)
        handleErrorField(!isIncorrectEntry)(input, v)
    }

    const handleNumberFieldChange = input => e => {
        validateField([isEmptyString, isNotANum, isExceedsMinMax,], input, e);
    }

    const handleIntegerNumberFieldChange = input => e => {
        validateField([isEmptyString, isNotAnInt, isNotANum, isExceedsMinMax,], input, e);
    }

    const bnfParamArr = () => [
        ['window', state.rollingWindow],
        ['delta_select', state.deltaSelect],
        ['delta', state.delta],
        ['ib', state.iterativeBackcasting],
        ['demean', state.demean],].concat(
        [['transform', state.transform]].concat(
            state.transform ? [
                    ['p_code', state.pCode],
                    ['d_code', state.dCode],
                    ['take_log', state.takeLog]
                ]
                : []
        ),
    ).concat(
        state.outliersForSE === 0 ? [['outliers_for_se', state.outliersForSE]] : [],
    );

    const maybeAddOutliersForCovid = ({dates}) => {
        const covidStartDate = new Date(2020, 2, 1); // 1st Mar 2020
        const covidEndDate = new Date(2020, 8, 30); // 30 Sept 2020
        return dates
            .map((date, index) => ({ date: new Date(date), index }))
            .filter(({ date }) => date >= covidStartDate && date <= covidEndDate)
            .map(({ index }) => index);
    }

    const fetchResultWithErrorHandling = async ({url, method, body, onFetchErrorCallback}) => {
        return fetchWithTimeout({method, body, url})
            .catch(e => {
                setState({alertErrorType: "TIMEOUT"});
                onFetchErrorCallback();
                throw e;
            })
            .then((response) => {
                if (response.status !== 200) {
                    setState({alertErrorType: "SERVER"});
                    onFetchErrorCallback();
                    throw new Error("bad status");
                } else {
                    return response.json();
                }
            });

    }

    const getResultsForFREDData = async ({onFetchErrorCallback}) => {

        const paramStr = pairArrayToParamStr(
            [['fred_abbr', state.mnemonic],
                ['freq', state.frequencyFRED],
                ['obs_start', DateAbstract.truncatedDate(state.startDateFRED)],
                ['obs_end', DateAbstract.truncatedDate(state.endDateFRED)],
            ].concat(bnfParamArr())
        );

        const finalURL = URL.baseBackendURL + URL.bnfFredDataSlug + paramStr;

        console.log(finalURL);

        setState({isLoading: true});

        await fetchResultWithErrorHandling({url: finalURL, method: "POST", onFetchErrorCallback})
            .then(result => {
                console.log('Success:', result);

                const
                    cycleRes = result["cycle"],
                    trendRes = result["trend"],
                    ciRes = result["cycle_ci"],
                    x = result["dates"],
                    transformedX = DateAbstract.createDate(state.frequencyFRED, DateAbstract.maybeConvertStringToDate(x[0]))
                        .nextTimePeriod(getDifferencingPeriod(state.dCode))
                        .getDateSeries(cycleRes.length).map(DateAbstract.truncatedDate);

                console.log("dates", x, transformedX)

                setState({
                    x,
                    transformedX,
                    y: result["original_y"],
                    transformedY: result["transformed_y"],
                    trend: trendRes,
                    cycle: cycleRes,
                    cycleCI: ciRes,
                    deltaCalc: result["delta"],
                    cycleCILB: confIntZip(cycleRes, ciRes, "lower"),
                    cycleCIUB: confIntZip(cycleRes, ciRes, "upper"),
                    trendCILB: confIntZip(trendRes, ciRes, "lower"),
                    trendCIUB: confIntZip(trendRes, ciRes, "upper"),
                    isLoading: false,
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    const getResultsForUserSpecifiedData = async ({onFetchErrorCallback}) => {

        // dealing with all operating system's newline characters
        const y = state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm, ",")
            .split(",")
            .filter(x => x !== "");

        setState({y});

        const paramStr = pairArrayToParamStr(bnfParamArr());

        const finalURL = URL.baseBackendURL + URL.bnfUserSpecifiedDataSlug + paramStr;

        console.log(finalURL);

        setState({isLoading: true});

        await fetchResultWithErrorHandling({
            url: finalURL,
            method: "POST",
            body: {'processed_y': y},
            onFetchErrorCallback
        })
            .then(result => {
                console.log('Success:', result);
                const
                    cycleRes = result["cycle"],
                    trendRes = result["trend"],
                    ciRes = result["cycle_ci"];

                const
                    x = state.frequency !== "n" ? // dated axis or numbered axis
                        DateAbstract.createDate(state.frequency, state.startDate).getDateSeries(cycleRes.length).map(DateAbstract.truncatedDate)
                        : Array.from({length: cycleRes.length}, (_, i) => i + 1),
                    transformedX = state.frequency !== "n" ? // dated axis or numbered axis
                        DateAbstract.createDate(state.frequency, state.startDate).nextTimePeriod(getDifferencingPeriod(state.dCode))
                            .getDateSeries(cycleRes.length).map(DateAbstract.truncatedDate)
                        : Array.from({length: cycleRes.length}, (_, i) => i + 1 + getDifferencingPeriod(state.dCode));

                setState({
                    x,
                    transformedX,
                    transformedY: result["transformed_y"],
                    trend: trendRes,
                    cycle: cycleRes,
                    cycleCI: ciRes,
                    deltaCalc: result["delta"],
                    cycleCILB: confIntZip(cycleRes, ciRes, "lower"),
                    cycleCIUB: confIntZip(cycleRes, ciRes, "upper"),
                    trendCILB: confIntZip(trendRes, ciRes, "lower"),
                    trendCIUB: confIntZip(trendRes, ciRes, "upper"),
                    isLoading: false,
                });
            }).catch((error) => {
                console.log(error);
            });

    }

    const updateTransformationState = () => {
        const isTransformApplied = !(state.takeLog === false && state.dCode === 'nd' && state.pCode === 'np');
        setState({"transform": isTransformApplied});
    }

    const getResults = (errorsDisplayedCount, onSuccessCallback, onFetchErrorCallback) => e => {
        e?.preventDefault();

        updateTransformationState();

        if (state.dataInputType === FRED && state.fieldErrorMessages["mnemonic"] !== undefined) {
            setState({"alertErrorType": "INPUT_USER_M"});
            cancelLoading();
        } else if (state.dataInputType === USER && state.fieldErrorMessages["unprocessedY"] !== undefined) {
            setState({"alertErrorType": "INPUT_USER_S"});
            cancelLoading();
        } else if (state.dataInputType === USER && state.fieldErrorMessages["startDate"] !== undefined) {
            setState({"alertErrorType": "INPUT_USER_DATE"});
            cancelLoading();
        } else if (errorsDisplayedCount() === 0) {
            onSuccessCallback();
            if (state.dataInputType === FRED) getResultsForFREDData({onFetchErrorCallback});
            else if (state.dataInputType === USER) getResultsForUserSpecifiedData({onFetchErrorCallback});
        } else {
            setState({"alertErrorType": "INPUT_PARAM"});
            cancelLoading();
        }
    }

    const handlers = {
        handleChange, handleNumberFieldChange, handleIntegerNumberFieldChange,
        handleCheckboxChange, handleErrorField, setState,
    };

    useEffect(() => {
        if (state.isDeeplinkApply) {
            const onFetchErrorCallback = () => {
                setState({step: PARAMETERS_STEP});
                cancelLoading();
            }

            getResults(() => 0, () => null, onFetchErrorCallback)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {(() => {
                switch (state.step) {
                    case 2:
                        return <DataForm
                            nextStep={nextStep}
                            prevStep={prevStep}
                            setErrorMessage={setErrorMessage}
                            deleteErrorMessage={deleteErrorMessage}
                            handlers={handlers}
                            values={{...state}}
                            errors={state.fieldErrorMessages}
                        />
                    case 3:
                        return (
                            <ParametersForm
                                nextStep={nextStep}
                                prevStep={prevStep}
                                cancelLoading={cancelLoading}
                                handlers={handlers}
                                getResults={getResults}
                                values={{...state}}
                                errors={state.fieldErrorMessages}
                            />
                        )
                    case 4:
                        return (
                            <>
                                {state.isLoading ? <Loading/> : <DataPlot
                                    prevStep={prevStep}
                                    setState={setState}
                                    plotPageValues={{...state}}
                                    modelParams={extractModelParams(state)}
                                />
                                }
                            </>
                        )
                    default: // case 1
                        return (
                            <StartMenu
                                nextStep={nextStep}
                                handleChange={handleChange}
                            />)
                }
            })()}
        </>
    )

}

export default BasePage