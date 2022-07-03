import React, {Component} from 'react';
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Select,
    TextField,
    Typography
} from "@mui/material";
import '../styles/App.css';
import {field} from "../config.json";
import createMenuItems from "../utils/CreateMenuItem";
import Error from "./Error";

export class ParametersForm extends Component {

    isDisabled = {
        rollingWindow: () => this.props.values.demean === "sm",
        delta: () => false, // this.props.values.deltaSelect !== 0,
    };

    isError = field => this.props.errors[field] !== undefined;

    isErrorDisplaying = field => this.isError(field) && !this.isDisabled[field]();

    errorsDisplayedCount = () => Object.keys(this.props.errors).map(key => this.isErrorDisplaying(key)).filter(x => x).length

    continue = e => {
        e.preventDefault();
        const {getResults, getFREDResults, values, cancelLoad} = this.props;

        console.log("errors", this.errorsDisplayedCount());

        if (this.errorsDisplayedCount() === 0) {
            if (values.dataInputType === "FRED"){
                getFREDResults();
            } else if (values.dataInputType === "USER"){
                getResults();
            }
            this.props.nextStep();
        }
        else {
            cancelLoad();
        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    preAnalysisTransformations = () => {
        const {values, handlers} = this.props;
        const {handleChange, handleCheckboxChange} = handlers;

        return (
            <>
                <div className="information">
                    <Divider light><FormControl variant="standard">
                        <FormControlLabel
                            label={<Typography
                                style={{fontSize: 'x-large'}}>Transformations</Typography>}
                            title="Transformations are applied in the order below and are done prior to estimation. Check this box to apply them."
                            control={<Checkbox
                                onChange={handleCheckboxChange('transform')}
                                // style={{transform: "scale(1.25)"}}
                                checked={values.transform}/>}
                        />
                    </FormControl></Divider>
                </div>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center" spacing={3}>
                    <Grid item xs={4}>
                        <FormControl variant="standard">
                            <FormControlLabel label="Natural Logarithm"
                                              title="Logarithm to the base of Euler's number"
                                              control={<Checkbox
                                                  size="small"
                                                  onChange={handleCheckboxChange('takeLog')}
                                                  checked={values.takeLog}
                                                  disabled={!values.transform}/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl variant="standard" sx={{minWidth: 350}}>
                            <InputLabel>Differencing Method</InputLabel>
                            <Select
                                title="Differencing method applied"
                                onChange={handleChange('dCode')}
                                defaultValue={values.dCode}
                                disabled={!values.transform}
                            >{createMenuItems(field.optionField.dCode.option)}</Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="standard" sx={{minWidth: 350}}>
                            <InputLabel>Computed Percentages</InputLabel>
                            <Select
                                title="Multiple applied"
                                onChange={handleChange('pCode')}
                                defaultValue={values.pCode}
                                disabled={!values.transform}
                            >{createMenuItems(field.optionField.pCode.option)}</Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </>)
    }

    bnFilterParameters = () => {

        const
            {values, handlers} = this.props,
            {handleChange, handleNumberFieldChange, handleIntegerNumberFieldChange} = handlers,
            errors = this.props.errors;

        return (
            <>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>Filter Parameters</Divider>
                </div>
                <div style={{
                    width: "450px",
                    alignItems: "center",
                    display: "inline-block",
                }}>
                    <Grid container alignItems="flex-start" justifyContent="space-evenly" spacing={3}>
                        <Grid item xs={8}>
                            <FormControl variant="standard" sx={{minWidth: 300}}>
                                <InputLabel>Signal-to-Noise Ratio (Delta)</InputLabel>
                                <Select
                                    label="Signal-to-Noise Ratio (Delta)"
                                    title="Signal-to-Noise Ratio according to benchmark KMW approach"
                                    onChange={handleChange('deltaSelect')}
                                    defaultValue={values.deltaSelect}
                                >{createMenuItems(field.optionField.deltaSelect.option)}</Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 170}}>
                                <TextField
                                    label={values.deltaSelect === 0 ? "Fixed Delta" : "Minimum Delta"}
                                    title={values.deltaSelect === 0 ? "Fixed delta for estimation" : "Minimum threshold start point for grid search"}
                                    onChange={handleNumberFieldChange('delta')}
                                    defaultValue={values.delta}
                                    disabled={this.isDisabled['delta']()}
                                    error={this.isErrorDisplaying('delta')}
                                    helperText={this.isErrorDisplaying('delta') ?
                                        errors['delta'] : "​" /* zero whitespace to prevent height difference when error displays*/}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl variant="standard" sx={{minWidth: 290}}>
                                <InputLabel>Demeaning</InputLabel>
                                <Select
                                    label="Demeaning method"
                                    onChange={handleChange('demean')}
                                    defaultValue={values.demean}
                                >{createMenuItems(field.optionField.iterativeDynamicDemeaning.option)}</Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 170}}>
                                <TextField
                                    label= "Rolling Window"
                                    title="Only necessary when the demeaning method is dynamic. Must be an integer."
                                    onChange={handleIntegerNumberFieldChange('rollingWindow')}
                                    defaultValue={values.rollingWindow}
                                    disabled={this.isDisabled['rollingWindow']()}
                                    error={this.isErrorDisplaying('rollingWindow')}
                                    helperText={this.isErrorDisplaying('rollingWindow') ?
                                        errors['rollingWindow'] : "​" /* zero whitespace to prevent height difference when error displays*/}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }

    render() {
        return (
            <>
                <div style={{minHeight: 600,}}>
                    {this.props.values.loading === null ?
                        <Error
                            tagName={"During the running of the BN filter a problem occurred. Please check that the inputs are appropriate."}
                            close={() => {this.props.handlers.handleChange("loading")({target: {value: false}})}}/>
                        : null}
                    {this.preAnalysisTransformations()}
                    {this.bnFilterParameters()}
                </div>
                <Button
                    variant="outlined"
                    style={styles.button}
                    onClick={this.back}
                >Back</Button>
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={this.continue}
                >Get Trend Decomposition</Button>
            </>
        )
    }
}


const styles = {
    button: {
        margin: "0 20px 100px",
    }
}

export default ParametersForm