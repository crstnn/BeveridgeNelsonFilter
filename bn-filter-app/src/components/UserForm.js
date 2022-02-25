import React, {Component} from 'react';
import StartMenu from './StartMenu';
import FormFilterParameters from "./FormFilterParameters";
import UserData from "./UserData";
import RenderedPlot from "./RenderedPlot";

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
    }

    baseBackendURL = 'https://bn-filtering.herokuapp.com'

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

    handleCheckboxChange = input => e => {
        this.setState({[input]: e.target.checked});
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
            cycle
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
                        values={values}
                        apiUrl={this.baseBackendURL}
                    />
                )
            case 4:
                return (
                    <RenderedPlot
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            default: // also case 1
                return (
                    <StartMenu
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={plotPageValues}
                    />
                )
        }

    }
}

export default UserForm