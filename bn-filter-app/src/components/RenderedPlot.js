import React, {Component} from "react";
import Plot from 'react-plotly.js';
import {Button} from "@mui/material";

export class RenderedPlot extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    getPlot() {
        const {plotPageValues} = this.props;
        const xAxis = Array.from({length: plotPageValues.cycle.length}, (_, i) => i + 1);

        return (
            <Plot layout={{autosize: true}}
                  data={[

                      {
                          x: xAxis,
                          y: plotPageValues.cycle,
                          type: 'scatter',
                          mode: 'lines+markers',
                          marker: {color: 'blue'},
                          name: "cycle",
                          showlegend: false,
                      },
                      { // confint lower bound: enclosing line (which is hidden) hence 0 opacity (using properties of 'tonexty')
                          x: xAxis,
                          y: plotPageValues.cycleCILB,
                          fill: "tonexty",
                          fillcolor: "rgba(0, 0, 0, 0)",
                          line: {color: "transparent"},
                          showlegend: false,
                          type: "scatter",
                          hoverinfo: 'skip',
                      },
                      { // confint upper bound
                          x: xAxis,
                          y: plotPageValues.cycleCIUB,
                          fill: "tonexty",
                          fillcolor: "rgba(0,100,80,0.2)",
                          line: {color: "transparent"},
                          showlegend: false,
                          type: "scatter",
                          hoverinfo: 'skip',
                      },
                      ]}
            />
        )
    }

    render() {

        return (
            <div>
                {this.getPlot()}
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