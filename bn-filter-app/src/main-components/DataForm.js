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

        handleChange('dataInputType')(e);
    }

    const next = e => {
        e.preventDefault();
        nextStep();
        if (dataInputType === FRED && values.mnemonic === "") {
            setErrorMessage("mnemonic", "A mnemonic must be specified");
        }
        if (dataInputType === USER && values.unprocessedY === "") {
            setErrorMessage("unprocessedY", "time series field cannot be empty");
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
