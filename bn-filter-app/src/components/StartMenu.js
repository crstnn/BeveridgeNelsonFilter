import React, {Component} from 'react';
import {Button} from "@mui/material";
import '../styles/App.css';

export class StartMenu extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {

        return (
            <div>
                <div className="information">
                    <p>You will be guided through the steps to perform trend-cycle decomposition on either:</p>
                        <ol>
                            <li>A time series from the Federal Reserve Economic Database (FRED) using its mnemonic</li>
                            <li>A time series of your choosing to be pasted into a field, or</li>
                        </ol>
                    <p>
                        Note that there is additional information provided when hovering over the options in the
                        subsequent pages. The cycle is reported and can be downloaded as a CSV.
                    </p>
                </div>

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
        margin: "30px 0 100px",
    }
}

export default StartMenu