import React from "react";
import {DesktopDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {TextField} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {isSameDay, isSameYear, isSameMonth} from "date-fns";

const DatePicker = ({date, label, minDate, maxDate, title, updateDate, isDisabled, frequency, shouldDisableSelections = (_isSameTime) => (_t) => false}) => {

    const handleDateChange = newValue => {
        updateDate({target: {value: newValue}});
    };

    const availableViews = ['day', 'month', 'year'];
    let dateSelectionFunc = isSameDay
    let minimumView = 'day'

    if(['a'].includes(frequency)) {
        availableViews.splice(0, 2)
        minimumView = availableViews[0]
        dateSelectionFunc = isSameYear
    } else if (['sa', 'q', 'm'].includes(frequency)) {
        availableViews.splice(0, 1)
        dateSelectionFunc = isSameMonth
        minimumView = availableViews[0]
    }

    const shouldDisableFunc = shouldDisableSelections(dateSelectionFunc)

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label={label}
                    inputFormat="dd/MM/yyyy"
                    value={date}
                    minDate={minDate}
                    maxDate={maxDate}
                    shouldDisableDate={minimumView === 'day' ? shouldDisableFunc : undefined}
                    shouldDisableMonth={minimumView === 'month' ? shouldDisableFunc : undefined}
                    shouldDisableYear={minimumView === 'year' ? shouldDisableFunc : undefined}
                    views={availableViews}
                    InputProps={{style: {width: 220}}}
                    onChange={handleDateChange}
                    disabled={isDisabled}
                    renderInput={(params) =>
                        <TextField {...params}
                                   title={title}
                                   InputLabelProps={{shrink: true}}
                                   inputProps={{...params.inputProps, placeholder: "DD/MM/YYYY"}}/>}
                />
            </LocalizationProvider>
        </div>
    );
}

export default DatePicker;