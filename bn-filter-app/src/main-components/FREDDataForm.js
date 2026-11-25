import React, {Component} from "react";
import {
    Divider,
    FormControl,
    FormGroup,
    FormHelperText,
    IconButton,
    InputLabel,
    Select,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import DatePicker, {sameTimeFor} from "./components/DatePicker";
import {CONFIG} from "../config.js";
import {createMenuItems, fetchWithTimeout, pairArrayToParamStr} from "../utils/utils";
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
        this.props.setState({isCheckingMnemonic: true});

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
            }).finally(() => setState({isCheckingMnemonic: false}));
        });
    }

    // The selectable dates for a frequency, or null when any date is allowed
    // (no frequency yet, or daily, where FRED skips weekends and holidays)
    frequencyDates = (frequency) => {
        const {minDate, maxDate} = this.props.values;
        if (!frequency || frequency === 'd') return null;
        try {
            return DateAbstract.createDate(frequency, DateAbstract.maybeConvertStringToDate(minDate))
                .getDateSeriesUpToMaxDate(maxDate);
        } catch (_e) {
            return null;
        }
    }

    // Moves the chosen dates onto the new frequency's periods, so they stay selectable
    handleFrequency = (e) => {
        const
            frequency = e.target.value,
            {startDateFRED, endDateFRED} = this.props.values,
            update = {frequencyFRED: frequency},
            series = this.frequencyDates(frequency);

        if (series && series.length > 0) {
            const
                isSameTime = sameTimeFor(frequency),
                isAllowed = date => series.some(d => isSameTime(d, date));

            if (startDateFRED && !isAllowed(startDateFRED))
                update.startDateFRED = series.find(d => d > startDateFRED) ?? series[series.length - 1];
            if (endDateFRED && !isAllowed(endDateFRED))
                update.endDateFRED = [...series].reverse().find(d => d < endDateFRED) ?? series[0];
        }

        this.props.setState(update);
    }

    calculateDisabledSelections = () => {
        const generatedDates = this.frequencyDates(this.props.values.frequencyFRED);

        if (!generatedDates)
            return (_isSameTime) => (_t) => false;

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
            <div>
                <div>
                    <FormGroup row>
                        <TextField variant="outlined" label="FRED Mnemonic"
                                   title="Press enter to check the availability of the mnemonic/series"
                                   color={errors["mnemonic"] === undefined && values.mnemonic !== "" ? "success" : null}
                                   placeholder="e.g. GDPC1" fullWidth
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
                </div>
            </div>
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
                <div className="formColumn" style={{marginTop: "16px"}}>
                    {this.mnemonicInput()}
                    <Divider
                        title="The options specifiy the data's range and frequency"
                        style={{fontSize: 'large', marginTop: "20px", marginBottom: "24px"}}>Options</Divider>
                    <Stack spacing={3}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Frequency
                                <Tooltip
                                    title="Time-series frequency. If the data is aggregated, the default aggregation method is averaging.">
                                    <IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
                                </Tooltip>
                            </InputLabel>
                            <Select
                                title="Time-series frequency"
                                onChange={this.handleFrequency}
                                value={values.frequencyFRED}
                            >{this.createFilteredFrequencies()}</Select>
                        </FormControl>
                        <DatePicker
                            label={"Start Date"}
                            title={"Series' start date (inclusive). Determined by FRED"}
                            date={values.startDateFRED}
                            minDate={values.minDate}
                            maxDate={values.maxDate}
                            frequency={values.frequencyFRED}
                            shouldDisableSelections={this.calculateDisabledSelections()}
                            updateDate={handleChange('startDateFRED')}/>
                        <DatePicker
                            label={"End Date"}
                            title={"Series' end date (inclusive). Determined by FRED"}
                            date={values.endDateFRED}
                            minDate={values.minDate}
                            maxDate={values.maxDate}
                            frequency={values.frequencyFRED}
                            shouldDisableSelections={this.calculateDisabledSelections()}
                            updateDate={handleChange('endDateFRED')}/>
                    </Stack>
                </div>
            </div>
        )
    }
}
