import React, {Component} from 'react';
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import '../styles/App.css';
import {options} from "../config.json";
import createMenuItems from "../utils/CreateMenuItem";

export class FormFilterParameters extends Component {

    continue = e => {
        const {getResults, cancelLoad, errors} = this.props;
        if (Object.keys(errors).length === 0) {
            getResults();
        } else {
            cancelLoad();
        }
        e.preventDefault();
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    preAnalysisTransformations = () => {
        const {values, handleChange, handleCheckboxChange} = this.props;

        return(
            <>
            <div className="information">
                <Divider light><FormControl variant="standard">
                    <FormControlLabel
                        label={<Typography
                            style={{fontSize: 'x-large'}}>Pre-Analysis Transformations</Typography>}
                        title="Transformations are applied in the order below and are done prior to the BN Filter run"
                        control={<Checkbox
                            onChange={handleCheckboxChange('transform')}
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
                    >{createMenuItems(options.dCode)}</Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl variant="standard" sx={{minWidth: 350}}>
                    <InputLabel>Computed Percentages</InputLabel>
                    <Select
                        title="Percentage multiple applied"
                        onChange={handleChange('pCode')}
                        defaultValue={values.pCode}
                        disabled={!values.transform}
                    >{createMenuItems(options.pCode)}</Select>
                </FormControl>
            </Grid>
        </Grid>
            </>)
    }

    bnFilterParameters = () => {

        const {values, handleChange, handleNumberFieldChange, handleIntegerNumberFieldChange, errors} = this.props;

        const
            isRollingWindowDisabled = values.isAutomaticWindow || values.demean === "sm",
            isFixedDeltaDisabled = values.deltaSelect !== 0;

        return (
            <>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>BN Filter Parameters</Divider>
                </div>
                <div style={{
                    width: "450px",
                    alignItems: "center",
                    display: "inline-block",
                    paddingBottom: "50px"
                }}>
                    <Grid container alignItems="flex-start" justifyContent="space-evenly" spacing={4}>
                        <Grid item xs={8}>
                            <FormControl variant="standard" sx={{minWidth: 300}}>
                                <InputLabel>Signal-to-Noise Ratio (Delta)</InputLabel>
                                <Select
                                    label="Signal-to-Noise Ratio (Delta)"
                                    title="Signal-to-Noise Ratio according to benchmark KMW approach"
                                    onChange={handleChange('deltaSelect')}
                                    defaultValue={values.deltaSelect}
                                >{createMenuItems(options.deltaSelect)}</Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 50}}>
                                <TextField
                                    label="Fixed Delta"
                                    title="Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'"
                                    onChange={handleNumberFieldChange('fixedDelta')}
                                    defaultValue={values.fixedDelta}
                                    disabled={isFixedDeltaDisabled}
                                    error={errors['fixedDelta'] !== undefined && !isFixedDeltaDisabled}
                                    helperText={errors['fixedDelta'] !== undefined && !isFixedDeltaDisabled ?
                                        errors['fixedDelta'] : ""}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl variant="standard" sx={{minWidth: 250}}>
                                <InputLabel>Demeaning</InputLabel>
                                <Select
                                    label="Iterative Dynamic Demeaning"
                                    onChange={handleChange('demean')}
                                    defaultValue={values.demean}
                                >{createMenuItems(options.iterativeDynamicDemeaning)}</Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl variant="standard" sx={{minWidth: 100}}>
                                <TextField
                                    label="Rolling Window"
                                    title="Only necessary when the demeaning method is dynamic. Must be an integer"
                                    onChange={handleIntegerNumberFieldChange('rollingWindow')}
                                    defaultValue={values.rollingWindow}
                                    disabled={isRollingWindowDisabled}
                                    error={errors['rollingWindow'] !== undefined && !isRollingWindowDisabled}
                                    helperText={errors['rollingWindow'] !== undefined && !isRollingWindowDisabled ?
                                        errors['rollingWindow'] : ""}
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
        margin: 20
    }
}

export default FormFilterParameters