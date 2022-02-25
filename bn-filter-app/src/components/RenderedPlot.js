import React, {Component} from "react";
import Plot from 'react-plotly.js';
import {Button} from "@mui/material";

export class RenderedPlot extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {plotPageValues} = this.props;
        return (
            <div>
                <Plot layout={{autosize: true}}
                      data={[
                          {
                              x: Array.from({length: plotPageValues.cycle.length}, (_, i) => i + 1),
                              y: plotPageValues.cycle,
                              type: 'scatter',
                              mode: 'lines+markers',
                              marker: {color: 'red'},
                          }]}
                />
                <div>
                    <Button
                        variant="contained"
                        style={styles.button}
                        onClick={this.back}
                    >Back</Button>
                </div>
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