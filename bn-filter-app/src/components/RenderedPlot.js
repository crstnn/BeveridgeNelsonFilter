import React, {Component} from "react";
import Plot from 'react-plotly.js';
import {Button} from "@mui/material";
import {CSVLink} from "react-csv";
import UserForm from "./UserForm";

export class RenderedPlot extends Component {

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    getCSVData() {
        const {plotPageValues} = this.props;

        return UserForm.colsToRows(
            ["cycle"].concat(plotPageValues.cycle),
            plotPageValues.dispCycleCI ? ["conf_int_lower_bound"].concat(plotPageValues.cycleCILB) : undefined,
            plotPageValues.dispCycleCI ? ["conf_int_upper_bound"].concat(plotPageValues.cycleCIUB) : undefined);
    }


    getPlot() {
        const {plotPageValues} = this.props;

        const xAxis = Array.from({length: plotPageValues.cycle.length}, (_, i) => i + 1);

        console.log(this.props);

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
                      plotPageValues.dispCycleCI ? {
                          // confint lower bound: enclosing line (which is hidden) hence 0 opacity (using properties of 'tonexty')
                          x: xAxis,
                          y: plotPageValues.cycleCILB,
                          fill: "tonexty",
                          fillcolor: "rgba(0, 0, 0, 0)",
                          line: {color: "transparent"},
                          showlegend: false,
                          type: "scatter",
                          hoverinfo: 'skip',
                      } : {},
                      plotPageValues.dispCycleCI ? { // confint upper bound
                          x: xAxis,
                          y: plotPageValues.cycleCIUB,
                          fill: "tonexty",
                          fillcolor: "rgba(0,100,80,0.2)",
                          line: {color: "transparent"},
                          showlegend: false,
                          type: "scatter",
                          hoverinfo: 'skip',
                      } : {},
                  ]}
            />
        )
    }

    render() {
        const {plotPageValues} = this.props;
        return (
            <div>
                <div>
                    <div>
                        {this.getPlot()}
                        <p> Delta: {plotPageValues.deltaCalc} </p>
                    </div>
                    <CSVLink
                        filename={"BNF_cycle.csv"}
                        data={this.getCSVData()}>Download as CSV</CSVLink>
                </div>
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
        margin: 40
    }
}

export default RenderedPlot