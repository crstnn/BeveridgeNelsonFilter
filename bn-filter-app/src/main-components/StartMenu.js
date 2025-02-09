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
                    <p>You will be guided through the steps to conduct trend-cycle decomposition on either:</p>
                    <ol>
                        <li>A time series from the Federal Reserve Economic Database (FRED) using its mnemonic, or</li>
                        <li>A time series of your choosing, to be pasted into a field</li>
                    </ol>
                    <p>
                        Additional information is provided by hovering over the options on the
                        subsequent pages. Default options are as in Kamber, Morley and Wong (2024). The results
                        get plotted and can be downloaded as a CSV.
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
                    <p>
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://forums.eviews.com/viewtopic.php?f=23&p=70928&sid=05f203388e73a52492e7596d20b69a0d#p70928">
                            Link to EViews add-in</a>
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