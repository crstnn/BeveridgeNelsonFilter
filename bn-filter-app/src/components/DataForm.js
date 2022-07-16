import React, {Component} from 'react';
import {
    ToggleButton,
    ToggleButtonGroup,
    Divider, Grid, Button,
} from "@mui/material";
import '../styles/App.css';
import {FREDDataForm} from "./FREDDataForm";
import {UserDataForm} from "./UserDataForm";

export class DataForm extends Component {

    toggleDataInputType = e => {
        const {errors, valuesUserData, valuesFREDData, handleChange, deleteErrorMessage,} = this.props;

        const
            isMnemonicErrorDisplaying =
            () => errors["mnemonic"] !== undefined && valuesFREDData.dataInputType === "FRED",
            isUserSeriesErrorDisplaying =
            () => errors["unprocessedY"] !== undefined && valuesUserData.dataInputType === "USER";

        if (isMnemonicErrorDisplaying()) deleteErrorMessage("mnemonic");
        if (isUserSeriesErrorDisplaying()) deleteErrorMessage("unprocessedY");

        handleChange('dataInputType')(e);
    }

    continue = e => {
        e.preventDefault();
        const {valuesUserData, valuesFREDData, setErrorMessage, nextStep,} = this.props;
        nextStep();
        if (valuesFREDData.dataInputType === "FRED" && valuesFREDData.mnemonic === "") {
            setErrorMessage("mnemonic", "mnemonic cannot be empty");
        }
        if (valuesUserData.dataInputType === "USER" && valuesUserData.unprocessedY === "") {
            setErrorMessage("unprocessedY", "time series field cannot be empty");
        }
        console.log(valuesUserData)
    }

    render() {
        const {valuesUserData, errors, valuesFREDData, setErrorMessage, deleteErrorMessage, handleChange, handleCheckboxChange} = this.props;

        return (
            <>
                <div style={{minHeight: 600,}}>
                    <div className="information">
                        <Divider style={{fontSize: 'x-large'}}>
                            <ToggleButtonGroup
                                color="primary"
                                value={valuesUserData.dataInputType}
                                exclusive
                                onChange={this.toggleDataInputType}
                            >
                                <ToggleButton value="FRED">FRED Series</ToggleButton>
                                <ToggleButton value="USER">User Series</ToggleButton>
                            </ToggleButtonGroup>
                        </Divider>
                    </div>
                    {(() => {
                        if (valuesUserData.dataInputType === "USER")
                            return <UserDataForm
                                        setErrorMessage={setErrorMessage}
                                        deleteErrorMessage={deleteErrorMessage}
                                        handleChange={handleChange}
                                        handleCheckboxChange={handleCheckboxChange}
                                        values={valuesUserData}
                                        errors={errors}
                                    />
                        else if (valuesUserData.dataInputType === "FRED")
                            return <FREDDataForm
                                    setErrorMessage={setErrorMessage}
                                    deleteErrorMessage={deleteErrorMessage}
                                    handleChange={handleChange}
                                    handleCheckboxChange={handleCheckboxChange}
                                    values={valuesFREDData}
                                    errors={errors}
                                    />
                    })()}
                </div>
                <Grid container direction="column" justifyContent="space-evenly"
                      alignItems="center">
                    <Grid item xs={3}>
                        <Button
                            variant="outlined"
                            style={styles.button}
                            onClick={this.props.prevStep}
                        >Back</Button>
                        <Button
                            variant="contained"
                            style={styles.button}
                            onClick={this.continue}
                        >Continue</Button>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default DataForm

const styles = {
    button: {
        minHeight: "45px",
        minWidth: "100px",
        margin: "0 20px 100px",
    },
    headingFormControlLabel: {fontSize: 'large'}
}