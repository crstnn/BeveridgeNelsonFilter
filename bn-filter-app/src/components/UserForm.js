import React, {Component} from 'react';
import StartMenu from './StartMenu';
import FormFilterParameters from "./FormFilterParameters";
import UserData from "./UserData";
import RenderedPlot from "./RenderedPlot";
import {Circles} from 'react-loader-spinner';
import {Error} from "./Error";

export class UserForm extends Component {
    state = {
        step: 1,
        unprocessedY: '',
        y: [], // time series
        fixedDelta: '',
        deltaSelect: 2,
        demean: 'sm',
        iterativeBackcasting: true,
        isAutomaticWindow: true,
        window: '',
        // periodicity
        periodicity: 0,
        dateObj: Object(),
        // transforms to data before bnf
        transform: false,
        dCode: 'nd',
        pCode: 'np',
        takeLog: false,
        // bnf output (from API)
        cycle: [],
        cycleSE: [],
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

    setCycle = input => d => {
        this.setState({[input]: d});
    }

    handleCheckboxChange = input => e => {
        this.setState({[input]: e.target.checked});
    }

    getResults = async () => {


        const paramsStr = [['window', this.state.window],
            ['delta_select', this.state.deltaSelect],
            ['fixed_delta', this.state.fixedDelta],
            ['ib', this.state.iterativeBackcasting],
            ['demean', this.state.demean],
            ['processed_y', this.state.unprocessedY.
                replace(/(\r\n|\n|\r)/gm, ",")],
            // dealing with all operating system's newline characters
            ['transform', this.state.transform],
            ['p_code', this.state.pCode],
            ['d_code', this.state.dCode],
            ['take_log', this.state.takeLog]]

            .reduce((pStr, currA) => {
                return pStr + currA[0].toString() + '=' + currA[1].toString() + '&'
            }, '?');


        console.log(this.baseBackendURL + "/user-specified-time-series" + paramsStr)


        this.setState({loading: true}, () => {
            fetch(this.baseBackendURL + "/user-specified-time-series" + paramsStr)
                .catch(error => {
                    console.error('Error:', error);
                })
                .then(result => {
                        if (result.status !== 200) {
                            this.setState({
                                loading: null,
                            })
                            throw ("bad status");
                        }
                    }
                )
                .then(response => {
                    if (response.status === 200) {
                        const result = response.json()
                        console.log('Success:', result);
                        this.setState({
                            loading: false,
                            cycle: (result["cycle"].map(x => Number(x))),
                            cycleSE: (result["cycleSE"].map(x => Number(x))),
                        })
                    }

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
            cycleSE,
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
            cycle,
            cycleSE,
        };

        const plotPageValues = {y, cycle, cycleSE, periodicity, dateObj}


        switch (step) {
            case 2:
                return (
                    <UserData
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleCheckboxChange={this.handleCheckboxChange}
                        values={values}
                    />
                )
            case 3:
                return (
                    <FormFilterParameters
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleCheckboxChange={this.handleCheckboxChange}
                        getResults={this.getResults}
                        values={values}
                    />
                )
            case 4:
                return (
                    <div>
                        {(() => {
                            if (this.state.loading === true) {
                                return (
                                    <div style={{display: "flex", justifyContent: "space-around", paddingTop: "30vh"}}>
                                        <Circles color="#003366" height={60} width={60}/>
                                    </div>
                                )
                            } else if (this.state.loading === false) {
                                return (<RenderedPlot
                                    prevStep={this.prevStep}
                                    handleChange={this.handleChange}
                                    plotPageValues={plotPageValues}
                                />)
                            } else {
                                return (
                                    // error page
                                    <Error/>
                                )
                            }
                        })()}

                    </div>
                )
            default: // also case 1
                return (
                    <StartMenu
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                    />
                )
        }

    }
}

export default UserForm