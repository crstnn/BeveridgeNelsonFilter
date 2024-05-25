import React, {useReducer} from 'react';
import StartMenu from './StartMenu';
import ParametersForm from "./ParametersForm";
import DataForm from "./DataForm";
import DataPlot from "./DataPlot";
import Loading from "./Loading";
import Error from "./Error";
import {CONFIG} from "../config.js";
import {DateAbstract} from "../utils/date";
import {confIntZip, extractModelParams, fetchWithTimeout, pairArrayToParamStr} from "../utils/utils";
import Apply from "./Apply";
import {useLocation} from "react-router-dom";
import {FRED} from "../utils/consts";

const {field, URL} = CONFIG;

const BasePage = () => {
    const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
        {
            step: 1,
            dataInputType: FRED,
            mnemonic: '',
            unprocessedY: '',
            x: [], // dates
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
            alertErrorType: null, // overarching alert text
            fieldErrorMessages: {},
            isLoading: false,
        }
    );

    const {
        step,
        dataInputType,
        mnemonic,
        unprocessedY,
        x,
        y,
        transformedY,
        delta,
        deltaSelect,
        demean,
        iterativeBackcasting,
        rollingWindow,
        frequency,
        startDate,
        endDate,
        startDateFRED,
        minDate,
        maxDate,
        endDateFRED,
        availableFrequencies,
        frequencyFRED,
        transform,
        dCode,
        pCode,
        takeLog,
        cycle,
        trend,
        displayConfInterval,
        cycleCI,
        deltaCalc,
        cycleCILB,
        cycleCIUB,
        trendCILB,
        trendCIUB,
        alertErrorType,
        fieldErrorMessages,
        isLoading,
    } = state;

    const nextStep = () => {
        setState({step: step + 1})
    };
    const prevStep = () => {
        setState({step: step - 1})
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
                ...fieldErrorMessages,
                [input]: message
            }
        });
    }

    const deleteErrorMessage = input => {
        const fieldErrorMessagesTemp = {...fieldErrorMessages};
        delete fieldErrorMessagesTemp[input];
        setState({fieldErrorMessages: fieldErrorMessagesTemp});
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
        ['window', rollingWindow],
        ['delta_select', deltaSelect],
        ['delta', delta],
        ['ib', iterativeBackcasting],
        ['demean', demean],].concat(
        [['transform', transform]].concat(
            transform ? [
                    ['p_code', pCode],
                    ['d_code', dCode],
                    ['take_log', takeLog]]
                : []
        )
    );

    const fetchResultWithErrorHandling = async ({url, onErrorCallback}) => {
        return fetchWithTimeout(url)
            .catch(e => {
                setState({alertErrorType: "TIMEOUT"});
                onErrorCallback();
                throw e;
            })
            .then((response) => {
                if (response.status !== 200) {
                    setState({alertErrorType: "SERVER"});
                    onErrorCallback();
                    throw new Error("bad status");
                } else {
                    return response.json();
                }
            });

    }

    const getResultsForFREDData = async ({onErrorCallback}) => {

        const paramStr = pairArrayToParamStr(
            [['fred_abbr', mnemonic],
                ['freq', frequencyFRED],
                ['obs_start', DateAbstract.truncatedDate(startDateFRED)],
                ['obs_end', DateAbstract.truncatedDate(endDateFRED)],
            ].concat(bnfParamArr())
        );

        const finalURL = URL.baseBackendURL + URL.bnfFredDataSlug + paramStr;

        console.log(finalURL);

        setState({isLoading: true});

        await fetchResultWithErrorHandling({url: finalURL, onErrorCallback})
            .then(result => {
                console.log('Success:', result);

                const
                    cycleRes = result["cycle"],
                    trendRes = result["trend"],
                    ciRes = result["cycle_ci"];

                setState({
                    x: result["dates"],
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

    const getResultsForUserSpecifiedData = async ({onErrorCallback}) => {

        // dealing with all operating system's newline characters
        const y = unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm, ",")
            .split(",")
            .filter(x => x !== "");

        setState({y});

        const paramStr = pairArrayToParamStr([['processed_y', y]].concat(bnfParamArr()));

        const finalURL = URL.baseBackendURL + URL.bnfUserSpecifiedDataSlug + paramStr;

        console.log(finalURL);

        setState({isLoading: true});

        await fetchResultWithErrorHandling({url: finalURL, onErrorCallback})
            .then(result => {
                console.log('Success:', result);
                const
                    cycleRes = result["cycle"],
                    trendRes = result["trend"],
                    ciRes = result["cycle_ci"];

                setState({
                    x: frequency !== "n" ? // dated axis or numbered axis
                        DateAbstract.createDate(frequency, startDate).getDateSeries(cycleRes.length).map(DateAbstract.truncatedDate)
                        : Array.from({length: cycleRes.length}, (_, i) => i + 1),
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

    const dataUserFormPageValues = {
        unprocessedY,
        startDate,
        endDate,
        frequency,
        dataInputType,
        displayConfInterval
    };
    const dataFREDFormPageValues = {
        startDateFRED,
        endDateFRED,
        minDate,
        maxDate,
        mnemonic,
        frequencyFRED,
        dataInputType,
        availableFrequencies,
        displayConfInterval
    };

    const parametersFormPageValues = {
        isLoading,
        unprocessedY,
        delta,
        deltaSelect,
        demean,
        iterativeBackcasting,
        rollingWindow,
        transform,
        dCode,
        pCode,
        takeLog,
        dataInputType,
        alertErrorType,
        step,
    };


    const handlers = {
        handleChange, handleNumberFieldChange, handleIntegerNumberFieldChange,
        handleCheckboxChange, handleErrorField, setState,
    };

    const plotPageValues = {
        x,
        y,
        transformedY,
        cycle,
        trend,
        deltaCalc,
        transform,
        displayConfInterval,
        cycleCI,
        cycleCILB,
        cycleCIUB,
        trendCILB,
        trendCIUB,
        frequency,
        startDate,
        dataInputType,
        mnemonic
    };

    const location = useLocation();

    if (location.pathname.endsWith('/apply')) {
        // handle application of bnf (deeplink)
        return <Apply handlers={handlers}/>
    }

    return (
        <>
            {(() => {
                switch (step) {
                    case 2:
                        return <DataForm
                            nextStep={nextStep}
                            prevStep={prevStep}
                            setErrorMessage={setErrorMessage}
                            deleteErrorMessage={deleteErrorMessage}
                            handlers={handlers}
                            valuesUserData={dataUserFormPageValues}
                            valuesFREDData={dataFREDFormPageValues}
                            errors={fieldErrorMessages}
                        />
                    case 3:
                        return (
                            <ParametersForm
                                nextStep={nextStep}
                                prevStep={prevStep}
                                cancelLoad={cancelLoading}
                                handlers={handlers}
                                getResults={getResultsForUserSpecifiedData}
                                getFREDResults={getResultsForFREDData}
                                values={parametersFormPageValues}
                                errors={fieldErrorMessages}
                            />
                        )
                    case 4:
                        return (
                            <>
                                {isLoading ? <Loading/> : <DataPlot
                                    prevStep={prevStep}
                                    plotPageValues={plotPageValues}
                                    modelParams={extractModelParams(state)}
                                    handleCheckboxChange={handleCheckboxChange}
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