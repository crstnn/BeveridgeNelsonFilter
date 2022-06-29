import React, {Component} from "react";
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel, FormGroup, FormHelperText,
    Grid,
    InputLabel,
    Select,
    TextField,
} from "@mui/material";
import {withStyles} from "@mui/styles";

import CustomDatePicker from "../pickers/CustomDatePicker";
import createMenuItems from "../utils/CreateMenuItem";
import {field} from "../config.json";

export class FREDDataForm extends Component {
    checkAvailability = () => {

    }

    mnemonicInput = () => {
        return (
            <Grid container direction="column" sx={{minHeight: 100,}}
                  justifyContent="space-evenly"
                  alignItems="center">
                <Grid item>
                    <FormGroup column>
                        <FormGroup row>
                            <JoinedTextField variant="outlined" label="FRED mnemonic"
                                             color="success" placeholder="e.g. GDPC1" />
                            <JoinedButton onClick={this.checkAvailability()} variant="outlined">Check</JoinedButton>
                        </FormGroup>
                        <FormHelperText>Please check availability</FormHelperText>
                    </FormGroup>
                </Grid>
            </Grid>
        )
    }


    render() {
        const {values, handleChange, handleCheckboxChange} = this.props;

        return (
            <div>
                <div className="information">
                    <p>Choose a FRED mnemonic and check its availability before continuing.</p>
                </div>
                <div style={{
                    width: "450px",
                    alignItems: "center",
                    display: "inline-block",
                }}>
                    {this.mnemonicInput()}
                    <Divider light
                             title="This option does not make alterations to the data but changes the display of the graph output"
                             style={{fontSize: 'large'}}>Options</Divider>

                    <Grid container direction="column" sx={{minHeight: 500,}}
                          justifyContent="space-evenly"
                          alignItems="center">
                        <Grid item xs={2}>
                            <CustomDatePicker
                                              label={"Start Date"}
                                              date={values.startDate}
                                              periodicity={values.periodicity}
                                              updateDate={d => this.props.handleChange('startDate')(d)}/>
                        </Grid>
                        <Grid item xs={2}>
                            <CustomDatePicker
                                              label={"End Date"}
                                              date={values.startDate}
                                              periodicity={values.periodicity}
                                              updateDate={d => this.props.handleChange('endDate')(d)}/>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="standard" sx={{minWidth: 220}}>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    title="Time-series frequency"
                                    onChange={handleChange('periodicity')}
                                    defaultValue={values.periodicity}
                                >{createMenuItems(field.optionField.periodicityManual.option)}</Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={2}>
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

                        <Grid item xs={2}>
                            <Button
                                variant="outlined"
                                style={styles.button}
                                onClick={this.props.prevStep}
                            >Back</Button>
                            <Button
                                variant="contained"
                                style={styles.button}
                                onClick={this.props.nextStep}
                            >Continue</Button>
                        </Grid>
                    </Grid>

                </div>
            </div>
        )
    }
}

const styles = {
    button: {
        margin: "0 30px 100px",
    },
    headingFormControlLabel: {fontSize: 'large'}
}

const JoinedTextField = withStyles({
    root: {
        "& fieldset": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        }
    }
})(TextField);

const JoinedButton = withStyles({
    root: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: "#ede8e8",
        borderColor: "#454545",
        color: "black",
    }
})(Button);