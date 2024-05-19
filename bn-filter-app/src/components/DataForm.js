import React from 'react';
import {Button, Divider, Grid, ToggleButton, ToggleButtonGroup,} from "@mui/material";
import '../styles/App.css';
import FREDDataForm from "./FREDDataForm";
import UserDataForm from "./UserDataForm";

const DataForm = ({
                      errors,
                      valuesUserData,
                      valuesFREDData,
                      handleChange,
                      deleteErrorMessage,
                      setErrorMessage,
                      setState,
                      prevStep,
                      nextStep
                  }) => {

    const toggleDataInputType = e => {
        const
            isMnemonicErrorDisplaying =
                () => errors["mnemonic"] !== undefined && valuesFREDData.dataInputType === "FRED",
            isUserSeriesErrorDisplaying =
                () => errors["unprocessedY"] !== undefined && valuesUserData.dataInputType === "USER";

        if (isMnemonicErrorDisplaying()) deleteErrorMessage("mnemonic");
        if (isUserSeriesErrorDisplaying()) deleteErrorMessage("unprocessedY");

        handleChange('dataInputType')(e);
    }

    const next = e => {
        e.preventDefault();
        nextStep();
        if (valuesFREDData.dataInputType === "FRED" && valuesFREDData.mnemonic === "") {
            setErrorMessage("mnemonic", "A mnemonic must be specified");
        }
        if (valuesUserData.dataInputType === "USER" && valuesUserData.unprocessedY === "") {
            setErrorMessage("unprocessedY", "time series field cannot be empty");
        }
        console.log(valuesUserData)
    }

    return (
        <>
            <div style={{minHeight: 600,}}>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>
                        <ToggleButtonGroup
                            color="primary"
                            value={valuesUserData.dataInputType}
                            exclusive
                            onChange={toggleDataInputType}
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
                            values={valuesUserData}
                            errors={errors}
                        />
                    else if (valuesUserData.dataInputType === "FRED")
                        return <FREDDataForm
                            setErrorMessage={setErrorMessage}
                            deleteErrorMessage={deleteErrorMessage}
                            handleChange={handleChange}
                            setState={setState}
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
                        onClick={prevStep}
                    >Back</Button>
                    <Button
                        variant="contained"
                        style={styles.button}
                        onClick={next}
                    >Continue</Button>
                </Grid>
            </Grid>
        </>
    )

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