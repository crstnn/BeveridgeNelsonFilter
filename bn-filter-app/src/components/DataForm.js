import React, {Component} from 'react';
import {
    Divider,
} from "@mui/material";
import '../styles/App.css';
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {FREDDataForm} from "./FREDDataForm";
import {UserDataForm} from "./UserDataForm";

export class DataForm extends Component {


    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values, handleChange, handleCheckboxChange} = this.props;

        return (
            <>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>
                        <ToggleButtonGroup
                            color="primary"
                            value={values.dataInputType}
                            exclusive
                            onChange={handleChange('dataInputType')}
                        >
                            <ToggleButton value="FRED">FRED Series</ToggleButton>
                            <ToggleButton value="USER">User Series</ToggleButton>
                        </ToggleButtonGroup>
                    </Divider>
                </div>

                {(() => {
                    switch (values.dataInputType) {
                        case "USER":
                            return <UserDataForm
                                    nextStep={this.continue}
                                    prevStep={this.back}
                                    handleChange={handleChange}
                                    handleCheckboxChange={handleCheckboxChange}
                                    values={values}/>
                        case "FRED":
                            return <FREDDataForm
                                nextStep={this.continue}
                                prevStep={this.back}
                                handleChange={handleChange}
                                handleCheckboxChange={handleCheckboxChange}
                                values={values}/>
                    }
                })()}

            </>
        )
    }
}


export default DataForm