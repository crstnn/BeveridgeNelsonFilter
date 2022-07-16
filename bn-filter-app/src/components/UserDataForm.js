import React, {Component} from "react";
import {
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Select,
    TextField
} from "@mui/material";
import CustomDatePicker from "../pickers/CustomDatePicker";
import createMenuItems from "../utils/CreateMenuItem";
import {field} from "../config.json";

export class UserDataForm extends Component {

    render() {
        const {values, handleChange, handleCheckboxChange} = this.props;

        return (
        <div>
            <div className="information">
                <p>Enter or paste in your chosen time series below. Each observation must start on the next line. Pasting a time series from a CSV will achieve the appropriate formatting.
                </p>
            </div>
            <FormControl variant="standard" sx={{m: 1, minWidth: 300, paddingRight: 2}}>
                <TextField
                    multiline
                    rows={16}
                    label="Time Series (y)"
                    title="Paste your chosen time series here"
                    onChange={handleChange('unprocessedY')}
                    InputLabelProps={{shrink: true}}
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
                width: "420px",
                alignItems: "center",
                display: "inline-block",
            }}>
                <div className="information">
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
                                defaultValue={values.frequency}
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
