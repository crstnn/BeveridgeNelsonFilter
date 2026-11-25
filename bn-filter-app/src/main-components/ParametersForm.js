import React from 'react';
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    Select,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import '../styles/App.css';
import {CONFIG} from "../config.js";
import ErrorAlert from "./components/Error";
import {createHoverText, createMenuItems} from "../utils/utils";
import {PARAMETERS_STEP} from "../utils/consts";

const {field, alertErrors} = CONFIG;

const ParametersForm = ({handlers, values, errors, prevStep, nextStep, cancelLoading, getResults}) => {

    const isDisabled = {
        rollingWindow: () => ["nd", "sm"].includes(values.demean),
        delta: () => false, // values.deltaSelect !== 0,
    };

    const isError = field => errors[field] !== undefined;

    const isErrorDisplaying = field => isError(field) && (isDisabled[field] === undefined || !isDisabled[field]());

    const errorsDisplayedCount = () => Object.keys(errors).map(key => isErrorDisplaying(key)).filter(x => x).length;

    const back = e => {
        e.preventDefault();
        prevStep();
    }

    const onFetchErrorCallback = () => {
        setState({step: PARAMETERS_STEP}); // keep on current step if error
        cancelLoading();
    }

    const preAnalysisTransformations = () => {
        const {handleChange, handleCheckboxChange} = handlers;

        return (
            <>
                <Tooltip
                    title="These transformations are applied to the base dataset. They are applied in the order of the fields."
                    arrow>
                    <Divider sx={{fontSize: "x-large", mt: "25px", mb: 3}}>
                        Transformations<IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
                    </Divider>
                </Tooltip>
                <Stack spacing={3} className="formColumn">
                    <FormControlLabel
                        sx={{alignSelf: "center"}}
                        label="Natural Logarithm"
                        control={<Checkbox size="small" onChange={handleCheckboxChange('takeLog')}
                                           checked={values.takeLog}/>}
                    />
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Differencing Method</InputLabel>
                        <Select onChange={handleChange('dCode')} value={values.dCode}>
                            {createMenuItems(field.optionField.dCode.option)}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Computed Percentages</InputLabel>
                        <Select onChange={handleChange('pCode')} value={values.pCode}>
                            {createMenuItems(field.optionField.pCode.option)}
                        </Select>
                    </FormControl>
                </Stack>
            </>
        );
    }

    const bnFilterParameters = () => {
        const {handleChange, handleNumberFieldChange, handleIntegerNumberFieldChange} = handlers;

        return (
            <>
                <Divider sx={{fontSize: "x-large", mt: "50px", mb: 4}}>Filter Parameters</Divider>
                <div className="formColumn" style={{maxWidth: 600}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel>
                                    Signal-to-Noise Ratio (Delta)
                                    <Tooltip
                                        title={createHoverText(field.optionField.deltaSelect.option)(values.deltaSelect)}>
                                        <IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
                                    </Tooltip>
                                </InputLabel>
                                <Select onChange={handleChange('deltaSelect')} value={values.deltaSelect}>
                                    {createMenuItems(field.optionField.deltaSelect.option)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label={values.deltaSelect === 0 ? "Fixed Delta" : "Minimum Delta"}
                                onChange={handleNumberFieldChange('delta')}
                                value={values.delta}
                                disabled={isDisabled['delta']()}
                                error={isErrorDisplaying('delta')}
                                helperText={isErrorDisplaying('delta') ? errors['delta'] : "​"}
                                InputProps={{
                                    endAdornment: (
                                        <Tooltip
                                            title={values.deltaSelect === 0 ? "Fixed delta for estimation" : "Minimum threshold start point for grid search (with grid increments of 0.0005). Lowest possible minimum will depend on time series, including length of sample period, with higher minimum needed for shorter time series."}>
                                            <IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
                                        </Tooltip>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel>
                                    Demeaning
                                    <Tooltip
                                        title={createHoverText(field.optionField.iterativeDynamicDemeaning.option)(values.demean)}>
                                        <IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
                                    </Tooltip>
                                </InputLabel>
                                <Select onChange={handleChange('demean')} value={values.demean}>
                                    {createMenuItems(field.optionField.iterativeDynamicDemeaning.option)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Rolling Window"
                                onChange={handleIntegerNumberFieldChange('rollingWindow')}
                                value={values.rollingWindow}
                                disabled={isDisabled['rollingWindow']()}
                                error={isErrorDisplaying('rollingWindow')}
                                helperText={isErrorDisplaying('rollingWindow') ? errors['rollingWindow'] : "​"}
                                InputProps={{
                                    endAdornment: (
                                        <Tooltip
                                            title="Only active when using dynamic demeaning. Upper bound is two less than the number of observations. A rolling window of 40 is suggested for quarterly macroeconomic data to average over effects of business cycles on mean growth, but appropriate value will depend on frequency of data, timeframe over which cyclical movements should average out, and sufficient observations to estimate drift precisely.">
                                            <IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
                                        </Tooltip>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }

    const {setState} = handlers;

    return (
        <>
            <div>
                {values.isLoading === null ?
                    <ErrorAlert
                        tagName={alertErrors[values.alertErrorType]}
                        close={() => {
                            setState({isLoading: false});
                        }}/>
                    : null}
                {preAnalysisTransformations()}
                {bnFilterParameters()}
            </div>
            <div className="buttonRow">
                <Button
                    variant="outlined"
                    onClick={back}
                >Back</Button>
                <Button
                    variant="contained"
                    onClick={(e) => {
                        getResults(errorsDisplayedCount, nextStep, onFetchErrorCallback)(e);
                    }}
                >Apply BN Filter</Button>
            </div>
        </>
    )

}

export default ParametersForm
