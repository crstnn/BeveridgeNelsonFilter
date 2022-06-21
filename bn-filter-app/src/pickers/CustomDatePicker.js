import React from "react";
import {LocalizationProvider} from "@mui/lab";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {TextField} from "@mui/material";
import {DateS} from "../utils/Date";
import {options} from "../config.json";

function CustomDatePicker(props) {
    const startDate = props.startDate;
    // const [startDate, setStartDate] = React.useState(props.startDate);

    const handleChange = (newValue) => {
        props.updateDate({target: {value: newValue }})
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Time Series Start Date"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    InputProps={{style: {width: 220}}}
                    onChange={handleChange}
                    disabled={props.isDisabled}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
}

export default CustomDatePicker;