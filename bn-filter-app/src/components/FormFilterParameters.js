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
            <div style={{
                width: "450px",
                alignItems: "center",
                display: "inline-block",
                paddingBottom: "50px"}}>
                <Grid container alignItems="center" spacing={4}>
                    <Grid item xs={8}>
                    <FormControl variant="standard" sx={{minWidth: 300}}>
                        <InputLabel>Signal-to-Noise Ratio (Delta)</InputLabel>
                        <Select
                            label="Signal-to-Noise Ratio (Delta)"
                            title="Signal-to-Noise Ratio according to benchmark KMW approach"
                            onChange={handleChange('lastName')}
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
                                title="Only necessary when 'Fixed Delta' is set for Signal-to-Noise Ratio"
                                onChange={handleChange('firstName')}
                                defaultValue={values.fixedDelta}
                                disabled={false}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="standard" sx={{minWidth: 450}}>
                        <InputLabel>Iterative Dynamic Demeaning</InputLabel>
                        <Select
                            label="Iterative Dynamic Demeaning"
                            onChange={handleChange('lastName')}
                            defaultValue={values.demean}
                        >
                            <MenuItem value={"sm"}>Static Demeaning</MenuItem>
                            <MenuItem value={"dm"}>Dynamic Demeaning</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl variant="standard" sx={{minWidth: 140}}>
                        <FormControlLabel control={<Checkbox defaultChecked/>} label="Automatic or"/>
                    </FormControl>
                    </Grid>
                    <Grid item xs={8} >
                    <FormControl variant="standard" sx={{minWidth: 280}}>
                        <TextField
                            label="Manual Rolling Sample Window"
                            type="number"
                            title="Rolling Window Length"
                            onChange={handleChange('firstName')}
                            defaultValue={values.window}
                            disabled={false}
                        />
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" sx={{minWidth: 450}}>
                            <FormControlLabel defaultValue={values.iterativeBackcasting} control={
                                <Checkbox defaultChecked/>}
                                              label="Iterative Backcasting"/>
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