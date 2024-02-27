import React, {Component} from "react";
import {Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, Select, TextField} from "@mui/material";
import CustomDatePicker from "../pickers/CustomDatePicker";
import config from "../config.json";
import {createMenuItems} from "../utils/utils";

const {field} = config;

export default class UserDataForm extends Component {

    handleTimeSeriesChange = e => {
        e.preventDefault();
        const
            timeSeries = e.target.value,
            {setErrorMessage, deleteErrorMessage, handleChange} = this.props;

        const
            notNumberReg = new RegExp(/[^\d.,\s]+/),
            arrayFormReg = new RegExp(/^((\d*(.\d+)?),\s*)+(\d*(.\d+)?)\s*$/),
            seriesFormReg = new RegExp(/^((\d*(.\d+)?)(\r\n|\n|\r))*((\d*(.\d+)?)(\r\n|\n|\r)?)$/);

        const
            nonNumberTest = notNumberReg.test(timeSeries),
            arrayFormTest = arrayFormReg.test(timeSeries),
            seriesFormTest = seriesFormReg.test(timeSeries);

        let errorMessage = null;

        if (timeSeries === "" || arrayFormTest || seriesFormTest) {
            deleteErrorMessage("unprocessedY");
        } else if (nonNumberTest) {
            errorMessage = "only accepts numbers, commas, and periods";
        } else if (!arrayFormTest && !seriesFormTest) {
            errorMessage = "bad input format";
        }
        if (errorMessage !== null) setErrorMessage("unprocessedY", errorMessage);

        handleChange('unprocessedY')(e);
    }

    render() {
        const {values, errors, handleChange, handleCheckboxChange} = this.props;

        return (
            <div>
                <div className="information">
                    <p>Enter or paste in your chosen time series below.
                        Pasting a time series from a CSV or array will achieve the appropriate formatting.
                    </p>
                </div>
                <FormControl variant="standard" sx={{m: 1, minWidth: 300, paddingRight: 2}}>
                    <TextField
                        multiline
                        rows={16}
                        label="Time Series (y)"
                        title="Paste your chosen time series here"
                        onChange={this.handleTimeSeriesChange}
                        InputLabelProps={{shrink: true}}
                        // Hacky newline fix that works for all browsers (newline/line break not functioning in Safari)
                        placeholder={"e.g. " + (new Array(100).join(" ")) +
                            "101.2, 104.8, 102.4, ..." + (new Array(100).join(" ")) +
                            "e.g." + (new Array(100).join(" ")) +
                            "101.2" + (new Array(100).join(" ")) +
                            "104.8" + (new Array(100).join(" ")) +
                            "102.4" + (new Array(100).join(" ")) +
                            "..."}
                        value={values.unprocessedY}
                        error={errors["unprocessedY"] !== undefined}
                        helperText={errors["unprocessedY"] !== undefined ?
                            errors['unprocessedY'] : "​" /* zero whitespace to prevent height difference when error displays */}
                    />
                </FormControl>
                <div style={{
                    width: "420px",
                    alignItems: "center",
                    display: "inline-block",
                }}>
                    <div className="dataInformation">
                        <Divider
                            title="This option does not make alterations to the data but changes the display of the graph output"
                            style={{fontSize: 'large'}}>Display Options</Divider>
                    </div>
                    <Grid container direction="column" sx={{minHeight: 400, paddingTop: 2}}
                          justifyContent="space-evenly"
                          alignItems="center">
                        <Grid item xs={4}>
                            <CustomDatePicker
                                label={"Start Date"}
                                title={"Series' start date (inclusive). The end date is determined based on frequency"}
                                date={values.startDate}
                                updateDate={this.props.handleChange('startDate')}
                                isDisabled={values.frequency === "n"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 220}}>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    title="Time-series frequency"
                                    onChange={handleChange('frequency')}
                                    value={values.frequency}
                                >{createMenuItems(field.optionField.frequencyManual.option)}</Select>
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
                </div>
            </div>
        )
    }
}
