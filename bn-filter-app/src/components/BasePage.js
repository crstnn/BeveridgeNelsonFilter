import React, {Component} from 'react';
import StartMenu from './StartMenu';
import ParametersForm from "./ParametersForm";
import DataForm from "./DataForm";
import RenderedPlot from "./RenderedPlot";
import Loading from "./Loading";
import Error from "./Error";
import {validation} from "../config.json";
import {DateS} from "../utils/Date";

export class BasePage extends Component {
    state = {
        step: 1,
        unprocessedY: '',
        x: [], // dates
        y: [], // processed time series
        fixedDelta: 0.1,
        deltaSelect: 2,
        demean: 'sm',
        iterativeBackcasting: true,
        isAutomaticWindow: false,
        rollingWindow: 40,
        periodicity: 'q', // periodicity
        startDate: null,
        transform: false, // transforms to data before bnf
        dCode: 'nd',
        pCode: 'np',
        takeLog: false,
        // bnf output (from API)
        cycle: [],
        dispCycleCI: false,
        cycleCI: [],
        deltaCalc: undefined,
        cycleCILB: [],
        cycleCIUB: [],
        loading: true,
        errorMessage: {},
    }

    loading = true;

    baseBackendURL = 'https://bn-filtering.herokuapp.com';
    bnfUserSpecifiedDataSlug = "/bnf/user-specified-time-series";
    bnfFredDataSlug = "/bnf/fred-time-series";
    fredDataSlug = "/fred-time-series";

    static confIntZip = (cycle, ci, bound) => cycle.map((x, i) => bound === "lb" ? x - ci[i] : /* ub */ x + ci[i]);

    static colsToRows = (...columns) => {

        columns = columns.filter(x => x !== undefined)

        // Pre-condition: All arrays are same length
        const
            rowLength = columns.length,
            colLength = columns[0].length;

        const retArr = [];

        for (let c = 0; c < colLength; c++) {
            const row = [];
            for (let r = 0; r < rowLength; r++) {
                row.push(columns[r][c]);
            }
            retArr.push(row)
        }

        return retArr;


    };

    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    cancelLoad = () => {
        this.setState({loading: null});
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    handleCheckboxChange = input => e => {
        this.setState({[input]: e.target.checked});
    }

    setErrorMessage = (input, message) => {
        this.setState({
            ["errorMessage"]: {
                ...this.state.errorMessage,
                [input]: message
            }
        });
    }

    handleNumberFieldChange = input => e => {
        console.log(e.target.value)
        if (isNaN(e.target.value)) {
            this.setErrorMessage(input, "must be numeric");
        } else if (e.target.value < validation[input].min) {
            this.setErrorMessage(input, `too small. must be ≥ ${validation[input].min}`);
        } else if (e.target.value > validation[input].max) {
            this.setErrorMessage(input, `too large. must be ≤ ${validation[input].max}`);
        } else {
            let state = {...this.state};
            delete state["errorMessage"][input];
            this.setState(state);
        }
        this.handleChange(input)(e);
    }

    handleIntegerNumberFieldChange = input => e => {
        if (e.target.value % 1 !== 0) {
            this.setErrorMessage(input, "must be an integer");
        }
        this.handleNumberFieldChange(input)(e);
    }

    getResults = async () => {

        // dealing with all operating system's newline characters
        this.state.y = this.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm, ",")
            .split(",")
            .filter(x => x !== "")

        const statePairToParam = (paramName, currPair) =>
            paramName + currPair[0].toString() + '=' + currPair[1].toString() + '&'

        const paramStr =
            [['window', this.state.rollingWindow],
                ['delta_select', this.state.deltaSelect],
                ['fixed_delta', this.state.fixedDelta],
                ['ib', this.state.iterativeBackcasting],
                ['demean', this.state.demean],
                ['processed_y', this.state.y]].concat(
                [['transform', this.state.transform]].concat(
                    this.state.transform ? [
                            ['p_code', this.state.pCode],
                            ['d_code', this.state.dCode],
                            ['take_log', this.state.takeLog]]
                        : []
                )
            )
                .reduce(statePairToParam, '?');

        const finalURL = this.baseBackendURL + this.bnfUserSpecifiedDataSlug + paramStr

        console.log(finalURL)


        this.setState({loading: true}, async () => {
            fetch(finalURL)
                .then((response) => {
                    if (response.status !== 200) {
                        this.cancelLoad();
                        throw new Error("bad status");
                    } else {
                        return response;
                    }
                })
                .then((response) => response.json())
                .then(result => {
                    console.log('Success:', result);

                    const
                        cycleRes = result["cycle"].map(x => Number(x)),
                        ciRes = result["ci"].map(x => Number(x)),
                        deltaRes = Number(result["delta"]);

                    this.setState({
                        x: this.state.periodicity !== "n" ? // dated axis or numbered axis
                            DateS.createDate(this.state.periodicity, this.state.startDate).getDateArray(cycleRes.length).map(DateS.getTruncatedDate)
                            : Array.from({length: cycleRes.length}, (_, i) => i + 1),
                        cycle: cycleRes,
                        cycleCI: ciRes,
                        deltaCalc: deltaRes,
                        cycleCILB: BasePage.confIntZip(cycleRes, ciRes, "lb"),
                        cycleCIUB: BasePage.confIntZip(cycleRes, ciRes, "ub"),
                        loading: false,
                    })

                }).catch((error) => {
                console.log(error)
            });
        });

    }


    render() {
        const {step} = this.state;
        const {
            x,
            y,
            unprocessedY,
            fixedDelta,
            deltaSelect,
            demean,
            iterativeBackcasting,
            isAutomaticWindow,
            rollingWindow,
            periodicity,
            startDate,
            transform,
            dCode,
            pCode,
            takeLog,
            cycle,
            deltaCalc,
            dispCycleCI,
            cycleCILB,
            cycleCIUB,
            errorMessage,
        } = this.state;
        const values = {
            y,
            unprocessedY,
            startDate,
            periodicity,
            fixedDelta,
            deltaSelect,
            demean,
            iterativeBackcasting,
            isAutomaticWindow,
            rollingWindow,
            transform,
            dCode,
            pCode,
            takeLog,
            dispCycleCI,
        };

        const plotPageValues = {x, y, cycle, deltaCalc, dispCycleCI, cycleCILB, cycleCIUB, periodicity, startDate}


        return (
            <>
                {(() => {
                    switch (step) {
                        case 2:
                            return <DataForm
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                handleChange={this.handleChange}
                                handleCheckboxChange={this.handleCheckboxChange}
                                values={values}
                            />

                        case 3:
                            return (
                                <>
                                    {this.state.loading === null ?
                                        <Error
                                            tagName={"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate."}
                                            close={() => {
                                                this.setState({loading: false})
                                            }}/>
                                        : null}

                                    <ParametersForm
                                        nextStep={this.nextStep}
                                        prevStep={this.prevStep}
                                        cancelLoad={this.cancelLoad}
                                        handleChange={this.handleChange}
                                        handleNumberFieldChange={this.handleNumberFieldChange}
                                        handleIntegerNumberFieldChange={this.handleIntegerNumberFieldChange}
                                        handleCheckboxChange={this.handleCheckboxChange}
                                        getResults={this.getResults}
                                        values={values}
                                        errors={errorMessage}
                                    />
                                </>
                            )
                        case 4:
                            return (
                                <>
                                    {(() => {
                                        if (this.state.loading === true) {
                                            return Loading();
                                        } else if (this.state.loading === false) {
                                            return (
                                                <RenderedPlot
                                                    prevStep={this.prevStep}
                                                    plotPageValues={plotPageValues}
                                                />)
                                        } else {
                                            // error
                                            this.prevStep();
                                        }
                                    })()}
                                </>
                            )
                        default: // case 1
                            return <StartMenu
                                nextStep={this.nextStep}
                                handleChange={this.handleChange}
                            />
                    }
                })()}
            </>
        )

    }
}

export default BasePage