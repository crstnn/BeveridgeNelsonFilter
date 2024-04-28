import React, {Component} from "react";
import {Divider, FormControl, FormGroup, FormHelperText, Grid, InputLabel, Select, TextField,} from "@mui/material";
import CustomDatePicker from "../pickers/CustomDatePicker";
import {CONFIG} from "../config.js";
import {createMenuItems, fetchWithTimeout, pairArrayToParamStr} from "../utils/utils";
import Error from "./Error";
import {ThreeDots} from "react-loader-spinner";

const {field, URL} = CONFIG;

export default class FREDDataForm extends Component {

    mnemonicTimeoutID = null;

    state = {
        mnemonic: this.props.values.mnemonic,
        loading: false,
        timeoutError: false,
    }

    createFilteredFrequencies = () => {
        const items = field.optionField.frequencyFRED.option.filter(x => this.props.values.availableFrequencies.includes(x.value));
        return createMenuItems(items);
    }

    handleMnemonic = (e) => {
        this.setState({mnemonic: e.target.value.toUpperCase()});

        if (this.mnemonicTimeoutID) clearTimeout(this.mnemonicTimeoutID);

        this.mnemonicTimeoutID = setTimeout(() => {
            this.checkAvailability();
        }, 500);  // 0.5-second debounce timer
    }


    checkAvailability = () => {
        const
            paramStr = pairArrayToParamStr([['fred_abbr', this.state.mnemonic]]),
            finalURL = URL.baseBackendURL + URL.fredDataSlug + paramStr;

        this.setState({loading: true}, async () => {

            const {handleChange, setErrorMessage, deleteErrorMessage} = this.props;

            const responseSuccess = () => {
                this.setState(
                    {
                        timeoutError: false,
                        loading: false,
                    });
            }

            fetchWithTimeout(finalURL)
                .catch(e => {
                    this.setState(
                        {
                            timeoutError: true,
                            loading: false,
                        });
                    setErrorMessage("mnemonic", "Internal error: Come back later");
                    throw e;
                })
                .then((response) => {
                    if (response.status !== 200) {
                        responseSuccess();
                        setErrorMessage("mnemonic", "This mnemonic is not available");
                        throw new Error("bad status");
                    } else {
                        return response;
                    }
                })
                .then((response) => response.json())
                .then(result => {
                    console.log('Success:', result);

                    const
                        parsedStartDate = result["start_date"].split("-").map(x => Number(x)),
                        parsedEndDate = result["end_date"].split("-").map(x => Number(x)),
                        startDate = new Date(parsedStartDate[0], parsedStartDate[1] - 1, parsedStartDate[2]),
                        endDate = new Date(parsedEndDate[0], parsedEndDate[1] - 1, parsedEndDate[2]);

                    console.log("Response - startDate: ", startDate)
                    console.log("Response - endDate: ", endDate)

                    deleteErrorMessage("mnemonic");
                    handleChange('availableFrequencies')({target: {value: result["available_frequencies"]}});
                    handleChange('frequencyFRED')({target: {value: result["available_frequencies"][0]}});
                    handleChange('mnemonic')({target: {value: this.state.mnemonic}});
                    handleChange('startDateFRED')({target: {value: startDate}});
                    handleChange('endDateFRED')({target: {value: endDate}});
                    handleChange('minDate')({target: {value: startDate}});
                    handleChange('maxDate')({target: {value: endDate}});
                    responseSuccess();

                }).catch((error) => {
                console.log(error);
            });
        });
    }

    mnemonicInput = () => {

        const
            {values, errors} = this.props,
            showText = () => !(errors["mnemonic"] === undefined && values.mnemonic === "") || this.state.timeoutError === true,
            mnemonicHelperText = () => {
                if (!showText()) return "​";
                return errors['mnemonic'] !== undefined ? errors['mnemonic'] : "This mnemonic is available";
            };


        return (
            <Grid container direction="column" sx={{minHeight: 80, marginBottom: 1}}
                  justifyContent="space-evenly"
                  alignItems="center">
                <Grid item>
                    <FormGroup row>
                        <TextField variant="outlined" label="FRED Mnemonic"
                                   title="Press enter to check the availability of the mnemonic/series"
                                   color={errors["mnemonic"] === undefined && values.mnemonic !== "" ? "success" : null}
                                   placeholder="e.g. GDPC1" sx={{width: 250}}
                                   error={errors["mnemonic"] !== undefined}
                                   onChange={e => this.handleMnemonic(e)}
                                   onKeyDown={e => e.key === "Enter" ? this.checkAvailability(e) : null}
                                   value={this.state.mnemonic}
                                   InputProps={{
                                       endAdornment: this.state.loading ?
                                           <ThreeDots height={30} width={30} color='grey'/> : null
                                   }}/>
                    </FormGroup>
                    <FormHelperText>{mnemonicHelperText()}</FormHelperText>
                </Grid>
            </Grid>
        )
    }


    render() {
        const {values, handleChange} = this.props;

        return (
            <div>
                <div className="information">
                    <p>Choose a <a target="_blank"
                                   rel="noopener noreferrer"
                                   href="https://fred.stlouisfed.org/tags/series">
                        FRED mnemonic</a> and check its availability before continuing.</p>
                </div>
                <div style={{
                    width: "420px",
                    alignItems: "center",
                    display: "inline-block",
                }}>
                    {this.mnemonicInput()}
                    <div className="dataInformation">
                        <Divider
                            title="The options specifiy the data's range and frequency"
                            style={{fontSize: 'large'}}>Options</Divider>
                    </div>
                    <Grid container direction="column" sx={{minHeight: 340,}}
                          justifyContent="space-evenly"
                          alignItems="center">
                        <Grid item xs={4}>
                            <CustomDatePicker
                                label={"Start Date"}
                                title={"Series' start date (inclusive). Determined by FRED"}
                                date={values.startDateFRED}
                                minDate={values.minDate}
                                maxDate={values.maxDate}
                                updateDate={handleChange('startDateFRED')}/>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomDatePicker
                                label={"End Date"}
                                title={"Series' end date (inclusive). Determined by FRED"}
                                date={values.endDateFRED}
                                minDate={values.minDate}
                                maxDate={values.maxDate}
                                updateDate={handleChange('endDateFRED')}/>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 220}}>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    title="Time-series frequency (default aggregation method: averaging)"
                                    onChange={handleChange('frequencyFRED')}
                                    value={values.frequencyFRED}
                                >{this.createFilteredFrequencies()}</Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
