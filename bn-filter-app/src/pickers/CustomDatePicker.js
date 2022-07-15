import React from "react";
import {LocalizationProvider, DesktopDatePicker} from '@mui/x-date-pickers';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {TextField} from "@mui/material";

function CustomDatePicker(props) {
    const date = props.date;

    const handleChange = (newValue) => {
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
                    onChange={handleChange}
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