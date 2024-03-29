import React, {Component} from 'react';
import {Button} from "@mui/material";
import '../styles/App.css';

class StartMenu extends Component {
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
                        <li>A time series from the Federal Reserve Economic Database (FRED) using its mnemonic, or</li>
                        <li>A time series of your choosing, to be pasted into a field</li>
                    </ol>
                    <p>
                        Note that there is additional information provided when hovering over the options in the
                        subsequent pages. The default options are as in Kamber, Morley and Wong (2024). The cycle is
                        plotted and can be downloaded as a CSV.
                    </p>
                    <p>
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://sites.google.com/site/jamescmorley/code#:~:text=Beveridge%2DNelson%20Filter">
                            Link to easily adaptable code in MATLAB or R</a>
                    </p>
                    <p>
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://github.com/crstnn/BeveridgeNelsonFilter">
                            Link to GitHub repository</a>
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
        minHeight: "45px",
        minWidth: "100px",
        margin: "30px 0 100px",
    }
}

export default StartMenu