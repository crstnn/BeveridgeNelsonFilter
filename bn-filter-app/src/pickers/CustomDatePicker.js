import React from "react";
import {DesktopDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {TextField} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";

function CustomDatePicker(props) {
    const date = props.date;

    const handleDateChange = newValue => {
        console.log("pre-handleDateChange: ", newValue)
        props.updateDate({target: {value: newValue}});
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label={props.label}
                    inputFormat="dd/MM/yyyy"
                    value={date}
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    InputProps={{style: {width: 220}}}
                    onChange={handleDateChange}
                    disabled={props.isDisabled}
                    renderInput={(params) =>
                        <TextField {...params}
                                   title={props.title}
                                   InputLabelProps={{shrink: true}}
                                   inputProps={{...params.inputProps, placeholder: "DD/MM/YYYY"}}/>}
                />
            </LocalizationProvider>
        </div>
    );
}

export default CustomDatePicker;