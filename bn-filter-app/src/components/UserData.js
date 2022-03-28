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
import CustomDatePicker from "../pickers/CustomDatePicker";

export class UserData extends Component {


    continue = e => {

        e.preventDefault();
        // process form
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values, handleChange, handleCheckboxChange, getState} = this.props;

        return (
            <>

                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>Time Series Input and Transformations</Divider>
                    <p>Enter or paste in your chosen time series below.
                        <br/>
                        Each line must contain a numerical value. The next observation must start on the next line (and
                        so on). For example, pasting a time series from a CSV will achieve the appropriate formatting.
                        Pasting time series from a CSV will achieve the above.
                    </p>
                </div>
                <div>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 300, paddingRight: 2}}>
                        <TextField
                            multiline
                            rows={20}
                            label="Time Series (y)"
                            title="Paste your chosen time series here"
                            onChange={handleChange('unprocessedY')}
                            placeholder={"e.g. 101.2,\n104.8,\n102.4,\n…"}
                            defaultValue={values.unprocessedY}
                        />
                    </FormControl>
                    <div style={{
                        width: "450px",
                        alignItems: "center",
                        display: "inline-block",
                    }}>
                        <Divider light
                                 title="This option does not make alterations to the data but changes the display on the x-axis"
                                 style={{fontSize: 'large'}}>X-Axis Display</Divider>
                        <Grid container direction="column" sx={{minHeight: 200}} justifyContent="space-evenly"
                              alignItems="center">

                            <Grid item xs={6}>
                                <FormControl variant="standard" sx={{minWidth: 300}}>
                                    <InputLabel>Data Frequency</InputLabel>
                                    <Select
                                        title="Time-series frequency"
                                        onChange={handleChange('periodicity')}
                                        defaultValue={values.periodicity}
                                    >
                                        <MenuItem value={0}>Undated</MenuItem>
                                        <MenuItem value={'q'}>Quarterly</MenuItem>
                                        <MenuItem value={'m'}>Monthly</MenuItem>
                                        <MenuItem value={'f'}>Fortnightly</MenuItem>
                                        <MenuItem value={'w'}>Weekly</MenuItem>
                                        <MenuItem value={'d'}>Daily</MenuItem>
                                        <MenuItem value={'h'}>Hourly</MenuItem>
                                        <MenuItem value={'m'}>By The Minute</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <CustomDatePicker isDisabled={getState("periodicity") === 0}/>
                            </Grid>
                        </Grid>

                        <Divider light><FormControl variant="standard">
                            <FormControlLabel
                                label={<Typography style={styles.headingFormControlLabel}>Pre-Analysis
                                    Transformations</Typography>}
                                title="Transformations are applied in the order below and are done prior to the BN Filter run"
                                control={<Checkbox
                                    onChange={handleCheckboxChange('transform')}
                                    checked={values.transform}/>}
                            />
                        </FormControl></Divider>
                        <Grid container direction="column" sx={{minHeight: 340}} justifyContent="space-evenly"
                              alignItems="center">
                            <Grid item xs={3}>
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
                                <FormControl variant="standard" sx={{minWidth: 320}}>
                                    <InputLabel>Differencing Method</InputLabel>
                                    <Select
                                        title="Differencing method applied"
                                        onChange={handleChange('dCode')}
                                        defaultValue={values.dCode}
                                        disabled={!values.transform}
                                    >
                                        <MenuItem value={'nd'}>No Differencing (Levels)</MenuItem>
                                        <MenuItem value={'d1'}>1st Difference</MenuItem>
                                        <MenuItem value={'d4'}>4th Difference (Ideal for Quarterly Data)</MenuItem>
                                        <MenuItem value={'d12'}>12th Difference (Ideal for Monthly Data)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="standard" sx={{minWidth: 320}}>
                                    <InputLabel>Computed Percentages</InputLabel>
                                    <Select
                                        title="Percentage multiple applied"
                                        onChange={handleChange('pCode')}
                                        defaultValue={values.pCode}
                                        disabled={!values.transform}
                                    >
                                        <MenuItem value={'np'}>No Change</MenuItem>
                                        <MenuItem value={'p1'}>Multiply by 100</MenuItem>
                                        <MenuItem value={'p4'}>Multiply by 400 (Annualised Quarterly Rate)</MenuItem>
                                        <MenuItem value={'p12'}>Multiply by 1200 (Annualised Monthly Rate)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    style={styles.button}
                                    onClick={this.back}
                                >Back</Button>
                                <Button
                                    variant="contained"
                                    style={styles.button}
                                    onClick={this.continue}
                                >Continue</Button>
                            </Grid>
                        </Grid>

                    </div>

                </div>

            </>
        )
    }
}


const styles = {
    button: {
        margin: 30

    },
    headingFormControlLabel: {fontSize: 'large'}
}


export default UserData