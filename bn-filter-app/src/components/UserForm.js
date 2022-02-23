import React, {Component} from 'react';
import StartMenu from './StartMenu';
import FormFilterParameters from "./FormFilterParameters";
import UserData from "./UserData";
import RenderedPlot from "./RenderedPlot";

export class UserForm extends Component {
    state = {
        step: 1,
        unprocessedY: '',
        y: '', // time series
        fixedDelta: '',
        deltaSelect: '',
        demean: '',
        iterativeBackcasting: true,
        window: '',
    }

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


    render() {
        const {step} = this.state;
        const {unprocessedY, fixedDelta, deltaSelect, demean, iterativeBackcasting, window} = this.state;
        const values = {unprocessedY, fixedDelta, deltaSelect, demean, iterativeBackcasting, window};

        switch (step) {
            case 2:
                return (
                    <UserData
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 3:
                return (
                    <FormFilterParameters
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 4:
                return <RenderedPlot/>
            default: // also case 1
                return (
                    <StartMenu
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
        }

    }
}

export default UserForm