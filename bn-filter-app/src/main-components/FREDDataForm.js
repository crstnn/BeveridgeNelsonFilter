import React, {Component} from "react";
import {
    Divider,
    FormControl,
    FormGroup,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import DatePicker from "./components/DatePicker";
import {CONFIG} from "../config.js";
import {createMenuItems, fetchWithTimeout, pairArrayToParamStr} from "../utils/utils";
import Error from "./components/Error";
import {ThreeDots} from "react-loader-spinner";
import {DateAbstract} from "../utils/date";
import InfoIcon from "@mui/icons-material/Info";

const {field, URL} = CONFIG;

export default class FREDDataForm extends Component {

    mnemonicTimeoutID = null;

    state = {
        mnemonic: this.props.values.mnemonic,
        loading: false,
        timeoutError: false,
    }

    componentDidMount() {
        if (this.state.mnemonic && this.props.values.isDeeplinkApply) {
            // This is to ensure the mnemonic's date range is enforced if a user steps back from the deeplink
            // `isDeeplinkApply` is then set to false to avoid an unnecessary mnemonic network call upon navigating back
            // to this form page. Once a user navigates to this form page from the deeplink there is no longer any
            // difference from a normal user interaction starting from the base page/URL.
            this.checkAvailability();
            this.props.setState({isDeeplinkApply: false});
        }
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
            const {setState, setErrorMessage, deleteErrorMessage} = this.props;

            const responseSuccess = () => {
                this.setState(
                    {
                        timeoutError: false,
                        loading: false,
                    });
            }

            fetchWithTimeout({url: finalURL})
                .catch(e => {
                    setState({mnemonic: this.state.mnemonic})
                    this.setState(
                        {
                            timeoutError: true,
                            loading: false,
                        });
                    setErrorMessage("mnemonic", "Internal error: Come back later");
                    throw e;
                })
                .then((response) => {
                    setState({mnemonic: this.state.mnemonic})
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
                        availableFrequencies = result["available_frequencies"],
                        startDate = DateAbstract.maybeConvertStringToDate(result["start_date"]),
                        endDate = DateAbstract.maybeConvertStringToDate(result["end_date"]);

                    console.log("Response - startDate: ", startDate);
                    console.log("Response - endDate: ", endDate);

                    deleteErrorMessage("mnemonic");

                    setState({
                        frequencyFRED: availableFrequencies[0],
                        startDateFRED: startDate,
                        endDateFRED: endDate,
                        availableFrequencies: availableFrequencies,
                        mnemonic: this.state.mnemonic,
                        minDate: startDate,
                        maxDate: endDate,
                    });

                    responseSuccess();

                }).catch((error) => {
                console.log(error);
            });
        });
    }

    calculateDisabledSelections = () => {
        const {frequencyFRED, minDate, maxDate} = this.props.values;

        if (!frequencyFRED)
            return (_isSameTime) => (_t) => false;

        const generatedDates = DateAbstract.createDate(frequencyFRED, DateAbstract.maybeConvertStringToDate(minDate))
            .getDateSeriesUpToMaxDate(maxDate);

        return (isSameTime) => (t) => !generatedDates.some(date => isSameTime(date, t));
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
                    marginTop: "10px",
                    alignItems: "center",
                    display: "inline-block",
                }}>
                    {this.mnemonicInput()}
                    <div className="dataInformation">
                        <Divider
                            title="The options specifiy the data's range and frequency"
                            style={{fontSize: 'large', marginTop: "20px"}}>Options</Divider>
                    </div>
                    <Grid container direction="column" sx={{minHeight: 340,}}
                          justifyContent="space-evenly"
                          alignItems="center">
                        <Grid item xs={4}>
                            <DatePicker
                                label={"Start Date"}
                                title={"Series' start date (inclusive). Determined by FRED"}
                                date={values.startDateFRED}
                                minDate={values.minDate}
                                maxDate={values.maxDate}
                                frequency={values.frequencyFRED}
                                shouldDisableSelections={this.calculateDisabledSelections()}
                                updateDate={handleChange('startDateFRED')}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker
                                label={"End Date"}
                                title={"Series' end date (inclusive). Determined by FRED"}
                                date={values.endDateFRED}
                                minDate={values.minDate}
                                maxDate={values.maxDate}
                                frequency={values.frequencyFRED}
                                shouldDisableSelections={this.calculateDisabledSelections()}
                                updateDate={handleChange('endDateFRED')}/>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="standard" sx={{minWidth: 220}}>
                                <InputLabel>Frequency
                                    <Tooltip
                                        title="Time-series frequency. If the data is aggregated, the default aggregation method is averaging.">
                                        <IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
                                    </Tooltip>
                                </InputLabel>
                                <Select
                                    title="Time-series frequency"
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
