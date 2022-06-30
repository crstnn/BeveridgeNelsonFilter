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
        mnemonic: "",
        isBadMnemonic: true,
        loading: false,
        frequency: "",
        minDate: null,
        maxDate: null,
        startDate: null,
        endDate: null,
        availableFrequencies: [],
    }

    continue = e => {
        this.props.handleChange('mnemonic')({target: {value: this.state.mnemonic}})
        this.props.handleChange('frequency')({target: {value: this.state.frequency}})
        this.props.handleChange('startDate')({target: {value: this.state.startDate}})
        this.props.handleChange('endDate')({target: {value: this.state.endDate}})
        this.props.nextStep(e);
    }

    createFilteredFrequencies = () => {
        const items = field.optionField.frequencyFRED.option.filter(x => this.state.availableFrequencies.includes(x.value));
        return createMenuItems(items);
    }

    checkAvailability = () => {
        const
            values = this.props.values,
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
                        startDate: startDate,
                        endDate: endDate,
                        availableFrequencies: result["available_frequencies"],
                        loading: false,
                        isBadMnemonic: false,
                    });

                }).catch((error) => {
                console.log(error);
            });
        });
    }

    mnemonicInput = () => {

        const mnemonicHelperText = () => {return this.state.isBadMnemonic ? "The mnemonic is not available" : "The mnemonic is available"}

        return (
            <Grid container direction="column" sx={{minHeight: 100}}
                  justifyContent="space-evenly"
                  alignItems="center">
                <Grid item>
                    <FormGroup row>
                        <JoinedTextField variant="outlined" label="FRED mnemonic"
                                         color={this.state.isBadMnemonic ? "error" : "success"} placeholder="e.g. GDPC1" sx={{width: 250}}
                                         onChange={(e) => this.setState({mnemonic: e.target.value}) }
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
        const {values, handleChange, handleCheckboxChange} = this.props;

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
                                              date={this.state.startDate}
                                              minDate={this.state.minDate}
                                              maxDate={this.state.maxDate}
                                              updateDate={d => this.setState({startDate: d.target.value})}/>
                        </Grid>
                        <Grid item xs={2}>
                            <CustomDatePicker
                                              label={"End Date"}
                                              date={this.state.endDate}
                                              minDate={this.state.minDate}
                                              maxDate={this.state.maxDate}
                                              updateDate={d => this.setState({startDate: d.target.value})}/>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="standard" sx={{minWidth: 220}}>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    title="Time-series frequency"
                                    onChange={d => this.setState({frequency: d.target.value})}
                                    defaultValue={this.state.frequency}
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
                                onClick={this.continue}
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