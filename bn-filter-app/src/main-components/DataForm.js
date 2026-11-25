import React from 'react';
import {Button, Divider, ToggleButton, ToggleButtonGroup,} from "@mui/material";
import '../styles/App.css';
import FREDDataForm from "./FREDDataForm";
import UserDataForm from "./UserDataForm";
import {FRED, USER} from "../utils/consts";

const DataForm = ({
                      errors,
                      values,
                      handlers,
                      deleteErrorMessage,
                      setErrorMessage,
                      prevStep,
                      nextStep
                  }) => {
    const {handleChange, setState} = handlers;
    const dataInputType = values.dataInputType;

    const toggleDataInputType = e => {
        const
            isMnemonicErrorDisplaying =
                () => errors["mnemonic"] !== undefined && dataInputType === FRED,
            isUserSeriesErrorDisplaying =
                () => errors["unprocessedY"] !== undefined && dataInputType === USER;

        if (isMnemonicErrorDisplaying()) deleteErrorMessage("mnemonic");
        if (isUserSeriesErrorDisplaying()) deleteErrorMessage("unprocessedY");
        if (dataInputType === USER) deleteErrorMessage("startDate");

        handleChange('dataInputType')(e);
    }

    const next = e => {
        e.preventDefault();
        if (dataInputType === FRED && values.mnemonic === "") {
            setErrorMessage("mnemonic", "A mnemonic must be specified");
        }
        if (dataInputType === USER && values.unprocessedY === "") {
            setErrorMessage("unprocessedY", "time series field cannot be empty");
        }
        const isMissingStartDate = values.frequency !== "n" && values.startDate === null;
        if (dataInputType === USER && isMissingStartDate) {
            setErrorMessage("startDate", "A start date must be specified (or choose Undated)");
        }

        // Only move on once the input has been checked and has no errors
        const isFREDReady = values.mnemonic !== "" && errors["mnemonic"] === undefined
            && !values.isCheckingMnemonic && values.startDateFRED !== null;
        const isUserSeriesReady = values.unprocessedY !== "" && errors["unprocessedY"] === undefined
            && !isMissingStartDate;

        if ((dataInputType === FRED && isFREDReady) || (dataInputType === USER && isUserSeriesReady)) {
            nextStep();
        }
    }

    return (
        <>
            <div>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>
                        <ToggleButtonGroup
                            color="primary"
                            value={dataInputType}
                            exclusive
                            onChange={toggleDataInputType}
                        >
                            <ToggleButton value={FRED}>FRED Series</ToggleButton>
                            <ToggleButton value={USER}>User Series</ToggleButton>
                        </ToggleButtonGroup>
                    </Divider>
                </div>
                {(() => {
                    if (dataInputType === USER)
                        return <UserDataForm
                            setErrorMessage={setErrorMessage}
                            deleteErrorMessage={deleteErrorMessage}
                            handleChange={handleChange}
                            values={values}
                            errors={errors}
                        />
                    else if (dataInputType === FRED)
                        return <FREDDataForm
                            setErrorMessage={setErrorMessage}
                            deleteErrorMessage={deleteErrorMessage}
                            handleChange={handleChange}
                            setState={setState}
                            values={values}
                            errors={errors}
                        />
                })()}
            </div>
            <div className="buttonRow">
                <Button
                    variant="outlined"
                    onClick={prevStep}
                >Back</Button>
                <Button
                    variant="contained"
                    onClick={next}
                >Continue</Button>
            </div>
        </>
    )

}

export default DataForm
