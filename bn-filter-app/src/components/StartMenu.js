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
                    <p>We will guide you through the steps to perform trend-cycle decomposition on either (i) a time
                        series of your choosing to be pasted into a field or (ii) a time series from the Federal Reserve
                        Economic Database (FRED) using its mnemonic. Note that there is additional information provided
                        when hovering over the options in the subsequent pages. The cycle is reported and can be
                        downloaded as a CSV.
                    </p>
                    <p>Choose the source of the time series you would like to proceed with:</p>
                </div>

                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    style={styles.button}*/}
                {/*    onClick={this.continue}*/}
                {/*>Proceed with FRED mnemonic</Button>*/}
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={this.continue}
                >Proceed with my own time series</Button>
                <br/>


            </div>
        )
    }
}

const styles = {
    button: {
        margin: 20
    }
}

export default StartMenu