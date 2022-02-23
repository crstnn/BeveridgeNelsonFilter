import React, {Component} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import '../styles/App.css';
import CustomDatePicker from "./CustomDatePicker";


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
        const {values, handleChange} = this.props;

        return (
            <div>
                <div className="information">
                    <p>Paste your chosen time series below.
                        <br/>
                        Each line must contain a numerical value. The next time-step must start on the next line (and so
                        on).
                        Pasting time series from a CSV will achieve the above.
                    </p>
                </div>
                <div>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 250}}>
                        <TextField
                            multiline
                            rows={18}
                            label="Time Series (Y)"
                            title="Paste Chosen Time Series Here"
                            onChange={handleChange('firstName')}
                            defaultValue={values.unprocessedY}
                        />
                    </FormControl>
                <div style={{
                    width: "450px",
                    alignItems: "center",
                    display: "inline-block",
                    }}>
                <Grid container direction="column" sx={{minHeight: 500}} justifyContent="space-evenly" alignItems="center" spacing={4}>
                    <Grid item xs={4}>
                    <FormControl variant="standard" sx={{minWidth: 300}}>
                        <InputLabel>Periodicity</InputLabel>
                        <Select
                            label="Periodicity"
                            title=""
                            onChange={handleChange('lastName')}
                            defaultValue={values.deltaSelect}
                        >
                            <MenuItem value={0}>Quarterly</MenuItem>
                            <MenuItem value={1}>Monthly</MenuItem>
                            <MenuItem value={2}>Fortnightly</MenuItem>
                            <MenuItem value={3}>Weekly</MenuItem>
                            <MenuItem value={3}>Hourly</MenuItem>
                            <MenuItem value={3}>By The Minute</MenuItem>
                            <MenuItem value={4}>Unspecified</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <CustomDatePicker/>
                    </Grid>
                    <Grid item xs={4}>
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

            </div>
        )
    }
}


const styles = {
    button: {
        margin: 15
    }
}

export default UserData