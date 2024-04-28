import React from "react";
import Plot from 'react-plotly.js';
import {Button} from "@mui/material";
import {CSVLink} from "react-csv";
import {colsToRows} from "../utils/utils";

const DataPlot = ({plotPageValues, prevStep}) => {

    const {displayConfInterval} = plotPageValues;
    const fileName = "BNF_cycle.csv";

    const back = e => {
        prevStep();
        e.preventDefault();
    }

    const getCSVData = () => colsToRows(
        ["date"].concat(plotPageValues.x),
        [`${plotPageValues.dataInputType === "FRED" ? `${plotPageValues.mnemonic}_` : ''}original_series`].concat(plotPageValues.y),
        plotPageValues.transform ? [`${plotPageValues.dataInputType === "FRED" ? `${plotPageValues.mnemonic}_` : ''}transformed_series`].concat(plotPageValues.transformedY) : undefined,
        ["trend"].concat(plotPageValues.trend),
        ["cycle"].concat(plotPageValues.cycle),
        displayConfInterval ? ["cycle_conf_int_lower_bound"].concat(plotPageValues.cycleCILB) : undefined,
        displayConfInterval ? ["cycle_conf_int_upper_bound"].concat(plotPageValues.cycleCIUB) : undefined,
        displayConfInterval ? ["trend_conf_int_lower_bound"].concat(plotPageValues.trendCILB) : undefined,
        displayConfInterval ? ["trend_conf_int_upper_bound"].concat(plotPageValues.trendCIUB) : undefined
    );


    const getPlot = () => {
        console.log(plotPageValues.x);
        console.log(plotPageValues.transformedY);


        const trendAndSeries = [
            {
                x: plotPageValues.x,
                y: plotPageValues.trend,
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'orange'},
                name: "Trend",
                showlegend: true,
                legendgroup: 'trend',
                yaxis: 'y1',
                visible: true,
            },
            {
                x: plotPageValues.x,
                y: plotPageValues.transformedY,
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'grey'},
                name: `Series${plotPageValues.transform ? ' (Post-Transformation)' : ''}`,
                showlegend: true,
                legendgroup: 'trend',
                yaxis: 'y1',
                visible: true,
            },
            displayConfInterval ? {
                // confint lower bound: enclosing line (which is hidden) hence 0 opacity (using properties of 'tonexty')
                x: plotPageValues.x,
                y: plotPageValues.trendCILB,
                fill: "tonexty",
                fillcolor: "rgba(0, 0, 0, 0)",
                line: {color: "transparent"},
                showlegend: false,
                type: "scatter",
                hoverinfo: 'skip',
                legendgroup: 'trend',
                yaxis: 'y1',
                visible: true,
            } : {},
            displayConfInterval ? { // confint upper bound
                x: plotPageValues.x,
                y: plotPageValues.trendCIUB,
                fill: "tonexty",
                fillcolor: "rgba(255,145,0,0.25)",
                line: {color: "transparent"},
                name: 'Trend CI',
                showlegend: false,
                type: "scatter",
                hoverinfo: 'skip',
                legendgroup: 'trend',
                yaxis: 'y1',
                visible: true,
            } : {},

        ];


        const cycle = [
            {
                x: plotPageValues.x,
                y: plotPageValues.cycle,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'blue'},
                name: "Cycle",
                showlegend: true,
                legendgroup: 'cycle',
                yaxis: 'y2',
                visible: 'legendonly',
            },
            displayConfInterval ? {
                // confint lower bound: enclosing line (which is hidden) hence 0 opacity (using properties of 'tonexty')
                x: plotPageValues.x,
                y: plotPageValues.cycleCILB,
                fill: "tonexty",
                fillcolor: "rgba(0, 0, 0, 0)",
                line: {color: "transparent"},
                showlegend: false,
                type: "scatter",
                hoverinfo: 'skip',
                legendgroup: 'cycle',
                yaxis: 'y2',
                visible: 'legendonly',
            } : {},
            displayConfInterval ? { // confint upper bound
                x: plotPageValues.x,
                y: plotPageValues.cycleCIUB,
                fill: "tonexty",
                fillcolor: "rgba(0,100,80,0.2)",
                line: {color: "transparent"},
                name: 'Cycle CI',
                showlegend: false,
                type: "scatter",
                hoverinfo: 'skip',
                legendgroup: 'cycle',
                yaxis: 'y2',
                visible: 'legendonly',
            } : {},
        ];

        const layout =
            {
                autosize: true,
                width: window.screen.width <= 700 ? 450 : 700, // fit to window size
                margin: {l: 20, r: 20, b: 50, t: 20},
                xaxis: {automargin: true},
                yaxis: {automargin: true, tickangle: 'auto', zeroline: false,},
                yaxis2: {
                    overlaying: 'y',
                    side: 'right',
                    automargin: true,
                    zeroline: false,
                },
                legend: {
                    orientation: "h",
                    xanchor: "center",
                    x: 0.5,
                    y: -0.10,
                },
            }

        return (
            <Plot
                layout={layout}
                data={[...trendAndSeries, ...cycle,]}
            />
        )
    }

    return (<>
            <div style={{minHeight: 600,}}>
                <div>
                    <div className="information">
                        <p>
                            Select from the legend of the graph below to toggle between plotting trend and/or cycle. The
                            scale for the trend/cycle is given on the left/right axis.
                        </p>
                    </div>
                    {getPlot()}
                    <p><strong>Delta:</strong> {plotPageValues.deltaCalc.toFixed(4) /* delta reported to 4 d.p. */}</p>
                </div>
                <CSVLink style={{textDecoration: "underline"}}
                         filename={fileName} data={getCSVData()}>Download as CSV</CSVLink>
            </div>
            <Button
                variant="outlined"
                style={styles.button}
                onClick={back}
            >Back</Button>
        </>
    );

}

const styles = {
    button: {
        minHeight: "45px",
        minWidth: "100px",
        margin: "0 20px 100px",
    }
}

export default DataPlot