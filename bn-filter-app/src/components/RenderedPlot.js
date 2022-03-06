import React, {Component} from "react";
import Plot from 'react-plotly.js';
import {Button} from "@mui/material";

export class RenderedPlot extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    static zip = (cycle, ci, bound) => cycle.map((x, i) => bound === "lb" ? x - ci[i] : x + ci[i] /* ub */);

    getPlot() {
        const {plotPageValues} = this.props;
        const xAxis = Array.from({length: plotPageValues.cycle.length}, (_, i) => i + 1);

        console.log(xAxis.concat(xAxis.reverse()))
        console.log(RenderedPlot.zip(plotPageValues.cycle, plotPageValues.cycleCI, "lb")
            .concat(RenderedPlot.zip(plotPageValues.cycle, plotPageValues.cycleCI, "ub")))

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
                      {
                          x: xAxis,
                          y: RenderedPlot.zip(plotPageValues.cycle, plotPageValues.cycleCI, "lb"),
                          fill: "tonexty",
                          fillcolor: "rgba(0,100,80,0)",
                          line: {color: "transparent"},
                          showlegend: false,
                          type: "scatter",
                          hoverinfo: 'skip',
                      },
                      {
                          x: xAxis,
                          y: RenderedPlot.zip(plotPageValues.cycle, plotPageValues.cycleCI, "ub"),
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