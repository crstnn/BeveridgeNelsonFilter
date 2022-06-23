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
    TextField
} from "@mui/material";
import '../styles/App.css';
import CustomDatePicker from "../pickers/CustomDatePicker";
import createMenuItems from "../utils/CreateMenuItem";
import {field} from "../config.json";

export class DataForm extends Component {


    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values, handleChange, handleCheckboxChange} = this.props;

        return (
            <>
                <div className="information">
                    <Divider style={{fontSize: 'x-large'}}>Data</Divider>
                    <p>Enter or paste in your chosen time series below.
                        <br/>
                        Each line must contain a numerical value. Each observation must start on the next line.
                        Pasting a time series from a CSV will achieve the appropriate formatting.
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
                            InputLabelProps={{
                                shrink: true
                            }}
                            // Hacky newline fix that works for all browsers
                            // (newline or line break not functioning in Safari)
                            placeholder={"e.g." + (new Array(100).join(" ")) +
                                "101.2" + (new Array(100).join(" ")) +
                                "104.8" + (new Array(100).join(" ")) +
                                "102.4" + (new Array(100).join(" ")) +
                                "..."}
                            defaultValue={values.unprocessedY}
                        />
                    </FormControl>
                    <div style={{
                        width: "450px",
                        alignItems: "center",
                        display: "inline-block",
                    }}>
                        <Divider light
                                 title="This option does not make alterations to the data but changes the display of the graph output"
                                 style={{fontSize: 'large'}}>Display Options</Divider>
                        <Grid container direction="column" sx={{minHeight: 250, paddingTop: 4}}
                              justifyContent="space-evenly"
                              alignItems="center">
                            <Grid item xs={4}>
                                <CustomDatePicker date={values.startDate}
                                                  periodicity={values.periodicity}
                                                  updateDate={d => this.props.handleChange('startDate')(d)}
                                                  isDisabled={values.periodicity === "n"}/>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl variant="standard" sx={{minWidth: 220}}>
                                    <InputLabel>Data Frequency</InputLabel>
                                    <Select
                                        title="Time-series frequency"
                                        onChange={handleChange('periodicity')}
                                        defaultValue={values.periodicity}
                                    >{createMenuItems(field.optionField.periodicityManual.option)}</Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl sx={{marginBottom: 3, marginTop: 2}} variant="standard">
                                    <FormControlLabel label="95% Confidence Intervals"
                                                      title="Choose to display 95% confidence intervals in graph output"
                                                      control={<Checkbox
                                                          size="small"
                                                          onChange={handleCheckboxChange('dispCycleCI')}
                                                          checked={values.dispCycleCI}/>}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container direction="column" sx={{minHeight: 340}} justifyContent="space-evenly"
                              alignItems="center">

                            <Grid item xs={3}>
                                <Button
                                    variant="outlined"
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
        margin: "0 30px 100px",
    },
    headingFormControlLabel: {fontSize: 'large'}
}


export default DataForm