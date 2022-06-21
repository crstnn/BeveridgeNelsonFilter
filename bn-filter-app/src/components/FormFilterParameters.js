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


export class FormFilterParameters extends Component {

    continue = e => {
        const {getResults} = this.props;
        e.preventDefault();
        getResults();
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    render() {
        const {values, handleChange, handleCheckboxChange} = this.props;

        return (
            <div>
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
                            >
                                <MenuItem value={'nd'}>No Differencing (Levels)</MenuItem>
                                <MenuItem value={'d1'}>1 Period Difference</MenuItem>
                                <MenuItem value={'d4'}>4 Period Difference (for Quarterly Data)</MenuItem>
                                <MenuItem value={'d12'}>12 Period Difference (for Monthly Data)</MenuItem>
                            </Select>
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
                            >
                                <MenuItem value={'np'}>No Change</MenuItem>
                                <MenuItem value={'p1'}>Multiply by 100</MenuItem>
                                <MenuItem value={'p4'}>Multiply by 400 (Annualized Quarterly Rate)</MenuItem>
                                <MenuItem value={'p12'}>Multiply by 1200 (Annualized Monthly Rate)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>BN Filter Parameters</Divider>
                </div>
                <div style={{
                    width: "450px",
                    alignItems: "center",
                    display: "inline-block",
                    paddingBottom: "50px"
                }}>
                    <Grid container alignItems="center" justifyContent="space-evenly" spacing={4}>
                        <Grid item xs={8}>
                            <FormControl variant="standard" sx={{minWidth: 300}}>
                                <InputLabel>Signal-to-Noise Ratio (Delta)</InputLabel>
                                <Select
                                    label="Signal-to-Noise Ratio (Delta)"
                                    title="Signal-to-Noise Ratio according to benchmark KMW approach"
                                    onChange={handleChange('deltaSelect')}
                                    defaultValue={values.deltaSelect}
                                >
                                    <MenuItem value={0}>Fixed Delta</MenuItem>
                                    <MenuItem value={1}>Maximize Amplitude-to-Noise Ratio</MenuItem>
                                    <MenuItem value={2}>Minimize Stochastic Trend Volatility</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 50}}>
                                <TextField
                                    label="Fixed Delta"
                                    title="Only necessary when Signal-to-noise ratio is set to 'Fixed Delta'"
                                    onChange={handleChange('fixedDelta')}
                                    defaultValue={values.fixedDelta}
                                    disabled={values.deltaSelect !== 0}
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
                                >
                                    <MenuItem value={"sm"}>Constant (Static Demeaning)</MenuItem>
                                    <MenuItem value={"dm"}>Dynamic Demeaning</MenuItem>
                                    <MenuItem value={"idm"}>Iterative Dynamic Demeaning</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl variant="standard" sx={{minWidth: 100}}>
                                <TextField
                                    label="Rolling Window"
                                    type="number"
                                    title="Only necessary when the demeaning method is dynamic. Must be an integer"
                                    onChange={handleChange('window')}
                                    defaultValue={values.window}
                                    disabled={values.isAutomaticWindow || values.demean === "sm"}
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