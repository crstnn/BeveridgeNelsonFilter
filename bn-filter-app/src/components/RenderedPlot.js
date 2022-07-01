import React, {Component} from "react";
import Plot from 'react-plotly.js';
import {Button} from "@mui/material";
import {CSVLink} from "react-csv";
import {colsToRows} from "../utils/Utils";

export class RenderedPlot extends Component {

    fileName = "BNF_cycle.csv"

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    getCSVData() {
        const {plotPageValues} = this.props;

        return colsToRows(
            ["date"].concat(plotPageValues.x),
            ["original_y"].concat(plotPageValues.y),
            ["cycle"].concat(plotPageValues.cycle),
            plotPageValues.dispCycleCI ? ["conf_int_lower_bound"].concat(plotPageValues.cycleCILB) : undefined,
            plotPageValues.dispCycleCI ? ["conf_int_upper_bound"].concat(plotPageValues.cycleCIUB) : undefined);
    }


    getPlot() {
        const {plotPageValues} = this.props;

        console.log(plotPageValues.x)
        console.log(plotPageValues.y)

        return (
            <Plot layout={{autosize: true, xaxis: {automargin: true}, yaxis: {automargin: true, tickangle: 'auto'}}}
                  data={[
                      {
                          x: plotPageValues.x,
                          y: plotPageValues.cycle,
                          type: 'scatter',
                          mode: 'lines+markers',
                          marker: {color: 'blue'},
                          name: "cycle",
                          showlegend: false,
                      },
                      plotPageValues.dispCycleCI ? {
                          // confint lower bound: enclosing line (which is hidden) hence 0 opacity (using properties of 'tonexty')
                          x: plotPageValues.x,
                          y: plotPageValues.cycleCILB,
                          fill: "tonexty",
                          fillcolor: "rgba(0, 0, 0, 0)",
                          line: {color: "transparent"},
                          showlegend: false,
                          type: "scatter",
                          hoverinfo: 'skip',
                      } : {},
                      plotPageValues.dispCycleCI ? { // confint upper bound
                          x: plotPageValues.x,
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
            <>
                <div style={{minHeight: 600,}}>
                    <div>
                        {this.getPlot()}
                        <p> Delta: {plotPageValues.deltaCalc} </p>
                    </div>
                    <CSVLink style={{textDecoration: "underline"}}
                             filename={this.fileName} data={this.getCSVData()}>Download as CSV</CSVLink>
                </div>
                <Button
                    variant="outlined"
                    style={styles.button}
                    onClick={this.back}
                >Back</Button>
            </>

        );
    }
}

const styles = {
    button: {
        margin: "0 20px 100px",
    }
}

export default RenderedPlot