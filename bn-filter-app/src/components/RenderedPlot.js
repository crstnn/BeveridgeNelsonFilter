import React, {Component} from "react";
import Plot from 'react-plotly.js';
import {Button} from "@mui/material";

export class RenderedPlot extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <div>
                <Plot/>
                <Button
                    variant="contained"
                    style={styles.button}
                    onClick={this.back}
                >Back</Button>
            </div>

        );
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default RenderedPlot