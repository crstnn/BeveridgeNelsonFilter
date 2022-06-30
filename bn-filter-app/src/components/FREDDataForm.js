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
import {field, URL} from "../config.json";
import {pairArrayToParamStr} from "../utils/Utils";
import Error from "./Error";
import {ThreeDots} from "react-loader-spinner";

export class FREDDataForm extends Component {

    state = {
        mnemonic: this.props.values.mnemonic,
        isBadMnemonic: null,
        loading: false,
        minDate: null,
        maxDate: null,
    }

    createFilteredFrequencies = () => {
        const items = field.optionField.frequencyFRED.option.filter(x => this.props.values.availableFrequencies.includes(x.value));
        return createMenuItems(items);
    }

    checkAvailability = () => {
        const
            paramStr = pairArrayToParamStr([['fred_abbr', this.state.mnemonic]]),
            finalURL = URL.baseBackendURL + URL.fredDataSlug + paramStr;

        this.setState({loading: true}, async () => {
            fetch(finalURL)
                .then((response) => {
                    if (response.status !== 200) {
                        this.setState(
                            {
                                isBadMnemonic: true,
                                loading: false,
                                });
                        throw new Error("bad status");
                    } else {
                        return response;
                    }
                })
                .then((response) => response.json())
                .then(result => {
                    console.log('Success:', result);

                    const
                        startDate = new Date(result["start_date"]),
                        endDate = new Date(result["end_date"]);

                    this.setState({
                        minDate: startDate,
                        maxDate: endDate,
                        loading: false,
                        isBadMnemonic: false,
                    });

                    this.props.handleChange('mnemonic')({target: {value: this.state.mnemonic}});
                    this.props.handleChange('startDateFRED')({target: {value: startDate}});
                    this.props.handleChange('endDateFRED')({target: {value: endDate}});
                    this.props.handleChange('availableFrequencies')({target: {value: result["available_frequencies"]}});
                    this.props.handleChange('frequencyFRED')({target: {value: result["available_frequencies"][0]}});

                }).catch((error) => {
                console.log(error);
            });
        });
    }

    mnemonicInput = () => {

        const mnemonicHelperText = () => {
            if (this.state.isBadMnemonic === null) {
                return "​"
            } else if (!this.state.isBadMnemonic) {
                return "The mnemonic is available"
            } else if (this.state.isBadMnemonic) {
                return "The mnemonic is not available"
            }
        }

        return (
            <Grid container direction="column" sx={{minHeight: 100}}
                  justifyContent="space-evenly"
                  alignItems="center">
                <Grid item>
                    <FormGroup row>
                        <JoinedTextField variant="outlined" label="FRED mnemonic"
                                         color={this.state.isBadMnemonic ? "error" : "success"} placeholder="e.g. GDPC1" sx={{width: 250}}
                                         onChange={(e) => this.setState({mnemonic: e.target.value}) }
                                         defaultValue={this.state.mnemonic}
                                         InputProps={{
                                             endAdornment: this.state.loading ? <ThreeDots height={30} width={30} color='grey'/> : null}}/>
                        <JoinedButton onClick={this.checkAvailability} variant="outlined">Check</JoinedButton>
                    </FormGroup>
                    <FormHelperText>{mnemonicHelperText()}</FormHelperText>
                </Grid>
            </Grid>
        )
    }


    render() {
        const {values, handleCheckboxChange} = this.props;

        return (
            <div>
                <div className="information">
                    <p>Choose a <a target="_blank"
                                                rel="noopener noreferrer"
                                                href="https://fred.stlouisfed.org/tags/series">
                        FRED mnemonic</a> and check its availability before continuing.</p>
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
                                              date={values.startDateFRED}
                                              minDate={this.state.minDate}
                                              maxDate={this.state.maxDate}
                                              updateDate={this.props.handleChange('startDateFRED')}/>
                        </Grid>
                        <Grid item xs={2}>
                            <CustomDatePicker
                                              label={"End Date"}
                                              date={values.endDateFRED}
                                              minDate={this.state.minDate}
                                              maxDate={this.state.maxDate}
                                              updateDate={this.props.handleChange('endDateFRED')}/>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="standard" sx={{minWidth: 220}}>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    title="Time-series frequency"
                                    onChange={this.props.handleChange('frequencyFRED')}
                                    defaultValue={values.frequencyFRED}
                                >{this.createFilteredFrequencies()}</Select>
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