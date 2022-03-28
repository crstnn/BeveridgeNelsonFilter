import React, {Component} from 'react';
import StartMenu from './StartMenu';
import FormFilterParameters from "./FormFilterParameters";
import UserData from "./UserData";
import RenderedPlot from "./RenderedPlot";
import {Circles} from "react-loader-spinner";
import {Alert} from "@mui/lab";

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
        window: 40,
        // periodicity
        periodicity: 'q',
        dateObj: Object(),
        // transforms to data before bnf
        transform: false,
        dCode: 'nd',
        pCode: 'np',
        takeLog: false,
        // bnf output (from API)
        cycle: [],
        cycleCI: [],
        cycleCILB: [],
        cycleCIUB: [],
        loading: true,
    }

    loading = true;

    baseBackendURL = 'https://bn-filtering.herokuapp.com';

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


    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    getState = input => {
        return this.state[input];
    }

    setCycle = input => d => {
        this.setState({[input]: d});
    }

    handleCheckboxChange = input => e => {
        this.setState({[input]: e.target.checked});
    }

    static confIntZip = (cycle, ci, bound) => cycle.map((x, i) => bound === "lb" ? x - ci[i] : x + ci[i] /* ub */);

    static colsToRows = (...columns) => {

        // Invariant: All arrays are same length
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

    getResults = async () => {

        const processedY = this.state.unprocessedY.replace(/(\r\n|\n|\r)/gm, ",")
            .split(",")
            .filter(x => x !== "")

        console.log(processedY)

        const paramsStr = [['window', this.state.window],
            ['delta_select', this.state.deltaSelect],
            ['fixed_delta', this.state.fixedDelta],
            ['ib', this.state.iterativeBackcasting],
            ['demean', this.state.demean],
            ['processed_y', processedY],
            // dealing with all operating system's newline characters
            ['transform', this.state.transform],
            ['p_code', this.state.pCode],
            ['d_code', this.state.dCode],
            ['take_log', this.state.takeLog]]
            .reduce((pStr, currA) => {
                return pStr + currA[0].toString() + '=' + currA[1].toString() + '&'
            }, '?');


        console.log(this.baseBackendURL + "/user-specified-time-series" + paramsStr)


        this.setState({loading: true}, async () => {
            fetch(this.baseBackendURL + "/user-specified-time-series" + paramsStr)
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
                    this.setState({
                        cycle: (result["cycle"].map(x => Number(x))),
                        cycleCI: (result["ci"].map(x => Number(x))),
                    })

                    this.setState({
                        loading: false,
                        cycleCILB: UserForm.confIntZip(this.state.cycle, this.state.cycleCI, "lb"),
                        cycleCIUB: UserForm.confIntZip(this.state.cycle, this.state.cycleCI, "ub"),
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
            window,
            periodicity,
            dateObj,
            transform,
            dCode,
            pCode,
            takeLog,
            cycle,
            cycleCILB,
            cycleCIUB,
        } = this.state;
        const values = {
            y,
            unprocessedY,
            fixedDelta,
            deltaSelect,
            demean,
            iterativeBackcasting,
            isAutomaticWindow,
            window,
            transform,
            dCode,
            pCode,
            takeLog,
        };

        const plotPageValues = {y, cycle, cycleCILB, cycleCIUB, periodicity, dateObj}


        return (
            <>
                {(() => {
                    switch (step) {
                        case 2:
                            return (
                                <UserData
                                    nextStep={this.nextStep}
                                    prevStep={this.prevStep}
                                    handleChange={this.handleChange}
                                    handleCheckboxChange={this.handleCheckboxChange}
                                    getState={this.getState}
                                    values={values}
                                />
                            )
                        case 3:
                            return (
                                <>
                                    {(() => {
                                        if (this.state.loading === null) {
                                            return (
                                                <div style={{margin: "2px 20%"}}>
                                                    <Alert variant="filled" severity="error"
                                                           onClose={() => {
                                                               this.setState({loading: false})
                                                           }}>
                                                        During the running of the BN filter a problem occurred.
                                                        Please check that the inputs are appropriate.
                                                    </Alert>
                                                </div>
                                            )
                                        }
                                    })()}
                                    <FormFilterParameters
                                        nextStep={this.nextStep}
                                        prevStep={this.prevStep}
                                        handleChange={this.handleChange}
                                        handleCheckboxChange={this.handleCheckboxChange}
                                        getResults={this.getResults}
                                        values={values}
                                    />
                                </>
                            )
                        case 4:
                            return (
                                <>
                                    {(() => {
                                        if (this.state.loading === true) {
                                            return (
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                    paddingTop: "30vh"
                                                }}>
                                                    <Circles height={75} width={75} color='grey'/>
                                                </div>
                                            )
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
                        default: // also case 1
                            return (

                                <StartMenu
                                    nextStep={this.nextStep}
                                    handleChange={this.handleChange}
                                />

                            )
                    }
                })()}
            </>
        )

    }
}

export default UserForm