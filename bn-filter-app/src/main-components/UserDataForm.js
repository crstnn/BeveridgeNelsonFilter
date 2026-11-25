import React, {Component} from "react";
import {Divider, FormControl, InputLabel, Select, Stack, TextField} from "@mui/material";
import DatePicker from "./components/DatePicker";
import {CONFIG} from "../config.js";
import {createMenuItems} from "../utils/utils";

const {field} = CONFIG;

export default class UserDataForm extends Component {

    handleTimeSeriesChange = e => {
        e.preventDefault();
        const
            timeSeries = e.target.value,
            {setErrorMessage, deleteErrorMessage, handleChange} = this.props;

        const
            notAnAcceptedCharReg = new RegExp(/[^\d-.,\s]+/),
            // one value: optional minus, then digits with an optional decimal part (or a bare .5)
            number = String.raw`(-?(?:\d+(?:\.\d*)?|\.\d+))?`,
            arrayFormReg = new RegExp(String.raw`^(${number},\s*)+${number}\s*$`),
            seriesFormReg = new RegExp(String.raw`^(${number}(\r\n|\n|\r))*(${number}(\r\n|\n|\r)?)$`);

        const
            notAnAcceptedCharTest = notAnAcceptedCharReg.test(timeSeries),
            arrayFormTest = arrayFormReg.test(timeSeries),
            seriesFormTest = seriesFormReg.test(timeSeries);

        let errorMessage = null;

        if (timeSeries === "" || arrayFormTest || seriesFormTest) {
            deleteErrorMessage("unprocessedY");
        } else if (notAnAcceptedCharTest) {
            errorMessage = "only accepts (decimalised) rational numbers";
        } else if (!arrayFormTest && !seriesFormTest) {
            errorMessage = "bad input format";
        }
        if (errorMessage !== null) setErrorMessage("unprocessedY", errorMessage);

        handleChange('unprocessedY')(e);
    }

    render() {
        const {values, errors, handleChange} = this.props;

        return (
            <div>
                <div className="information">
                    <p>Enter or paste in your chosen time series below.
                        Pasting a time series from a CSV or array will achieve the appropriate formatting.
                    </p>
                </div>
                <div className="formColumn" style={{marginTop: "16px"}}>
                    <FormControl fullWidth>
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
                    <Divider
                        title="This option does not make alterations to the data but changes the display of the plot output"
                        style={{fontSize: 'large', marginTop: "20px", marginBottom: "24px"}}>Display Options</Divider>
                    <Stack spacing={3}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Frequency</InputLabel>
                            <Select
                                title="Time-series frequency"
                                onChange={handleChange('frequency')}
                                value={values.frequency}
                            >{createMenuItems(field.optionField.frequencyManual.option)}</Select>
                        </FormControl>
                        <DatePicker
                            label={"Start Date"}
                            title={"Series' start date (inclusive). The end date is determined based on frequency"}
                            date={values.startDate}
                            updateDate={handleChange('startDate')}
                            frequency={values.frequency}
                            isDisabled={values.frequency === "n"}/>
                    </Stack>
                </div>
            </div>
        )
    }
}
