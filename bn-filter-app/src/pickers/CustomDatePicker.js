import React from "react";
import {LocalizationProvider} from "@mui/lab";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {TextField} from "@mui/material";

function CustomDatePicker(props) {
    const date = props.date;
    // const [startDate, setStartDate] = React.useState(props.startDate);

    const handleChange = (newValue) => {
        props.updateDate({target: {value: newValue}});
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Time Series Start Date"
                    inputFormat="dd/MM/yyyy"
                    value={date}
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