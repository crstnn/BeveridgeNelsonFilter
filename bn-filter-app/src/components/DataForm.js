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

    toggleDataInputType = (e) => {
        const
            isMnemonicErrorDisplaying =
            () => this.props.errors["mnemonic"] !== undefined && this.props.valuesFREDData.dataInputType === "FRED",
            isUserSeriesErrorDisplaying =
            () => this.props.errors["unprocessedY"] !== undefined && this.props.valuesUserData.dataInputType === "USER";

        if (isMnemonicErrorDisplaying()) this.props.deleteErrorMessage("mnemonic");
        if (isUserSeriesErrorDisplaying()) this.props.deleteErrorMessage("unprocessedY");

        this.props.handleChange('dataInputType')(e);
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
        if (this.props.valuesFREDData.dataInputType === "FRED" && this.props.valuesFREDData.mnemonic === "") {
            this.props.setErrorMessage("mnemonic", "Mnemonic cannot be empty");
        }
        if (this.props.valuesUserData.dataInputType === "USER" && this.props.valuesUserData.unprocessedY === "") {
            this.props.setErrorMessage("unprocessedY", "Data field cannot be empty");
        }
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
                                        handleChange={handleChange}
                                        handleCheckboxChange={handleCheckboxChange}
                                        values={valuesUserData}/>
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