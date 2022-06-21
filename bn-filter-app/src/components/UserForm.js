import React, {Component} from 'react';
import StartMenu from './StartMenu';
import FormFilterParameters from "./FormFilterParameters";
import UserData from "./UserData";
import RenderedPlot from "./RenderedPlot";
import Loading from "./Loading";
import ServerError from "./ServerError";
import validationConfig from "./../config.json";

export class UserForm extends Component {
    state = {
        step: 1,
        unprocessedY: '',
        y: [], // time series
        fixedDelta: 0.1,
        deltaSelect: 2,
        demean: 'sm',
        iterativeBackcasting: true,
        isAutomaticWindow: false,
        rollingWindow: 40,
        periodicity: 'q', // periodicity
        dateObj: Object(),
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

    setErrorMessage = (input, message) => {
        this.setState({["errorMessage"]: {...this.state.errorMessage,
                [input]: message
            }});
    }

    handleNumberFieldChange = input => e => {
        console.log(e.target.value)
        if (isNaN(e.target.value)) {
            this.setErrorMessage(input, "must be numeric");
        }
        else if (e.target.value < validationConfig[input].min){
            this.setErrorMessage(input, `too small. must be ≥ ${validationConfig[input].min}`);
        }
        else if (e.target.value > validationConfig[input].max) {
            this.setErrorMessage(input, `too large. must be ≤ ${validationConfig[input].max}`);
        }
        else{
            let state = {...this.state};
            delete state["errorMessage"][input];
            this.setState(state);
        }
        this.handleChange(input)(e);
    }

    handleIntegerNumberFieldChange = input => e => {
        if (e.target.value % 1 !== 0) {
            this.setErrorMessage(input,"must be an integer");
        }
        this.handleNumberFieldChange(input)(e);
    }

    handleCheckboxChange = input => e => {
        this.setState({[input]: e.target.checked});
    }

    getState = input => {
        return this.state[input];
    }



    getResults = async () => {

        // dealing with all operating system's newline characters
        const processedY = this.state.unprocessedY.replace(/(,?(\r\n|\n|\r))|(,\s)/gm, ",")
            .split(",")
            .filter(x => x !== "")

        console.log(processedY)

        const statePairToParam = (paramName, currPair) =>
            paramName + currPair[0].toString() + '=' + currPair[1].toString() + '&'

        const paramStr =
            [['window', this.state.rollingWindow],
                ['delta_select', this.state.deltaSelect],
                ['fixed_delta', this.state.fixedDelta],
                ['ib', this.state.iterativeBackcasting],
                ['demean', this.state.demean],
                ['processed_y', processedY]].concat(
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
                        this.setState({
                            loading: null,
                        })
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
                        cycle: cycleRes,
                        cycleCI: ciRes,
                        deltaCalc: deltaRes,
                        cycleCILB: UserForm.confIntZip(cycleRes, ciRes, "lb"),
                        cycleCIUB: UserForm.confIntZip(cycleRes, ciRes, "ub"),
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
            y,
            unprocessedY,
            fixedDelta,
            deltaSelect,
            demean,
            iterativeBackcasting,
            isAutomaticWindow,
            rollingWindow,
            periodicity,
            dateObj,
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

        const plotPageValues = {y, cycle, deltaCalc, dispCycleCI, cycleCILB, cycleCIUB, periodicity, dateObj}


        return (
            <>
                {(() => {
                    switch (step) {
                        case 2:
                            return <UserData
                                    nextStep={this.nextStep}
                                    prevStep={this.prevStep}
                                    handleChange={this.handleChange}
                                    handleCheckboxChange={this.handleCheckboxChange}
                                    getState={this.getState}
                                    values={values}
                                    />

                        case 3:
                            return (
                                <>
                                    {this.state.loading === null ?
                                        <ServerError close={() => {
                                            this.setState({loading: false})
                                        }}/>
                                        : null}

                                    <FormFilterParameters
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
                                                    handleChange={this.handleChange}
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

export default UserForm