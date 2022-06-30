import React, {Component} from 'react';
import {
    ToggleButton,
    ToggleButtonGroup,
    Divider,
} from "@mui/material";
import '../styles/App.css';
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
        const {valuesUserData, valuesFREDData, handleChange, handleCheckboxChange} = this.props;

        return (
            <>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>
                        <ToggleButtonGroup
                            color="primary"
                            value={valuesUserData.dataInputType}
                            exclusive
                            onChange={handleChange('dataInputType')}
                        >
                            <ToggleButton value="FRED">FRED Series</ToggleButton>
                            <ToggleButton value="USER">User Series</ToggleButton>
                        </ToggleButtonGroup>
                    </Divider>
                </div>

                {(() => {
                    switch (valuesUserData.dataInputType) {
                        case "USER":
                            return <UserDataForm
                                    nextStep={this.continue}
                                    prevStep={this.back}
                                    handleChange={handleChange}
                                    handleCheckboxChange={handleCheckboxChange}
                                    values={valuesUserData}/>
                        case "FRED":
                            return <FREDDataForm
                                nextStep={this.continue}
                                prevStep={this.back}
                                handleChange={handleChange}
                                handleCheckboxChange={handleCheckboxChange}
                                values={valuesFREDData}/>
                    }
                })()}

            </>
        )
    }
}


export default DataForm