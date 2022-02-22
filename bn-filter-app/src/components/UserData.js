import React, {Component} from 'react';
import {Button, FormControl, TextField} from "@mui/material";
import '../styles/App.css';

export class UserData extends Component {
    continue = e => {
        e.preventDefault();
        // process form
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values, handleChange} = this.props;

        return (
            <div>
                <div className="information">
                    <p>Paste your chosen time series below.
                        <br/>
                        Each line must contain a numerical value. The next time-step must start on the next line (and so
                        on).
                        Pasting time series from a CSV will achieve the above.
                    </p>
                </div>
                <FormControl variant="standard" sx={{m: 1, minWidth: 250}}>
                    <TextField
                        multiline
                        rows={18}
                        label="Time Series (Y)"
                        title="Paste Chosen Time Series Here"
                        onChange={handleChange('firstName')}
                        defaultValue={values.unprocessedY}
                    />

                </FormControl>
                <br/>
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={this.back}
                >Back</Button>
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={this.continue}
                >Continue</Button>

                <br/>

            </div>
        )
    }
}


const styles = {
    button: {
        margin: 15
    }
}

export default UserData