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
                    <p>We will guide you through the steps to perform trend-cycle composition, on either a time series
                        of
                        your choosing or a country's GDP from the Federal Reserve Economic Database (FRED)</p>
                    <p>Choose the kind of time series you would like to proceed with:</p>
                </div>


                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={this.continue}
                >FRED time series</Button>
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={this.continue}
                >My own time series</Button>
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

export default StartMenu