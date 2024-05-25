import React from "react";
import {DesktopDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {TextField} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";

const DatePicker = ({date, label, minDate, maxDate, title, updateDate, isDisabled}) => {

    const handleDateChange = newValue => {
        updateDate({target: {value: newValue}});
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label={label}
                    inputFormat="dd/MM/yyyy"
                    value={date}
                    minDate={minDate}
                    maxDate={maxDate}
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