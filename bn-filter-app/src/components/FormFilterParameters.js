import React, {Component} from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import '../styles/App.css';


export class FormFilterParameters extends Component {

    continue = e => {
        e.preventDefault();

        const {apiUrl} = this.props;
        const {values} = this.props;

        console.log('test')

        const paramsStr = [['window', values.window],
                            ['delta_select',values.deltaSelect],
                            ['fixed_delta',values.fixedDelta],
                            ['ib',values.iterativeBackcasting],
                            ['demean',values.demean],
                            ['processed_y',values.y]]
                            .reduce((pStr, currA) => {
                                return pStr + currA[0].toString() + '=' + currA[1].toString() + '&'
                            }, '?');

        console.log(paramsStr)

        fetch(apiUrl + "/user-specified-time-series" + paramsStr)
            .catch(error => {
                console.error('Error:', error);
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            });


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
                <div style={{
                    width: "450px",
                    alignItems: "center",
                    display: "inline-block",
                    paddingBottom: "50px"
                }}>
                    <Grid container alignItems="center" spacing={4}>
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
                                    <MenuItem value={1}>Maximise Amplitude-to-Noise Ratio</MenuItem>
                                    <MenuItem value={2}>Minimise Trend Shocks</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 50}}>
                                <TextField
                                    label="Fixed Delta"
                                    type="number"
                                    title="Only necessary when Signal-to-Noise Ratio is set to 'Fixed Delta'"
                                    onChange={handleChange('fixedDelta')}
                                    defaultValue={values.fixedDelta}
                                    disabled={values.deltaSelect !== 0}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{minWidth: 450}}>
                                <InputLabel>Iterative Dynamic Demeaning</InputLabel>
                                <Select
                                    label="Iterative Dynamic Demeaning"
                                    onChange={handleChange('demean')}
                                    defaultValue={values.demean}
                                >
                                    <MenuItem value={"sm"}>Static Demeaning</MenuItem>
                                    <MenuItem value={"dm"}>Dynamic Demeaning</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" sx={{minWidth: 240}}>
                                <FormControlLabel label="Automatic Rolling Window or"
                                    control={<Checkbox
                                        onChange={handleCheckboxChange('isAutomaticWindow')}
                                        checked={values.isAutomaticWindow}/>}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" sx={{minWidth: 200}}>
                                <TextField
                                    label="Manual Rolling Window"
                                    type="number"
                                    title="Only necessary when 'Rolling Window' is not set to automatic"
                                    onChange={handleChange('window')}
                                    defaultValue={values.window}
                                    disabled={values.isAutomaticWindow}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{minWidth: 450}}>
                                <FormControlLabel label="Iterative Backcasting"
                                    control={<Checkbox
                                        onChange={handleCheckboxChange('iterativeBackcasting')}
                                        checked={values.iterativeBackcasting}/>}
                                    />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                <br/>
                <Button
                    variant="contained"
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
        margin: 15
    }
}

export default FormFilterParameters