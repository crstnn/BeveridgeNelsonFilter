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

export class ParametersForm extends Component {

    isDisabled = {
        rollingWindow: () => this.props.values.demean === "sm",
        fixedDelta: () => this.props.values.deltaSelect !== 0,
    };

    isError = field => this.props.values.errorMessage[field] !== undefined;

    isErrorDisplaying = field => this.isError(field) && !this.isDisabled[field]();

    errorsDisplayedCount = () => Object.keys(this.props.errors).map(key => this.isErrorDisplaying(key)).filter(x=>x).length

    continue = e => {
        e.preventDefault();
        const {getResults, cancelLoad} = this.props;

        if (this.errorsDisplayedCount() === 0)
            getResults();
        else
            cancelLoad();

        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    // resetFreeTextField = (f) => {
    //     this.props.handlers.handleChange(field)({target: {value: field.freeText[f].default}})
    // }
    //
    // handleLinkedField = (linkedField) => {if (this.isDisabled[linkedField]()) this.resetFreeTextField(linkedField);}

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
                <Grid container direction="column" justifyContent="space-evenly" spacing={4}
                      alignItems="center">
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
            errors = values.errorMessage;

        return (
            <>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>Filter Parameters</Divider>
                </div>
                <div style={{
                    width: "450px",
                    alignItems: "center",
                    display: "inline-block",
                    paddingBottom: "50px"
                }}>
                    <Grid container alignItems="flex-start" justifyContent="space-evenly" spacing={2}>
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
                                    label="Fixed Delta"
                                    title="Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'"
                                    onChange={handleNumberFieldChange('fixedDelta')}
                                    defaultValue={values.fixedDelta}
                                    disabled={this.isDisabled['fixedDelta']()}
                                    error={this.isErrorDisplaying('fixedDelta')}
                                    helperText={this.isErrorDisplaying('fixedDelta') ?
                                        errors['fixedDelta'] : "​" /* zero whitespace to prevent height difference when error displays*/}
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
                                    label="Rolling Window"
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
                        {/*<Grid item xs={12}>*/}
                        {/*    <FormControl variant="standard" sx={{minWidth: 450}}>*/}
                        {/*        <FormControlLabel label="Iterative Backcasting"*/}
                        {/*                          title="When unselected backcasting is based on unconditional mean*/}
                        {/*                                (original KMW approach)"*/}
                        {/*                          control={<Checkbox*/}
                        {/*                              onChange={handleCheckboxChange('iterativeBackcasting')}*/}
                        {/*                              checked={values.iterativeBackcasting}/>}*/}
                        {/*        />*/}
                        {/*    </FormControl>*/}
                        {/*</Grid>*/}
                    </Grid>
                </div>
            </>
        )
    }

    render() {
        return (
            <div>
                {this.preAnalysisTransformations()}
                {this.bnFilterParameters()}
                <br/>
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
                <br/>

            </div>
        )
    }
}


const styles = {
    button: {
        margin: "0 30px 100px",
    }
}

export default ParametersForm