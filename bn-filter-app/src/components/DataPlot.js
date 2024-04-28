import React, {useState} from "react";
import Plot from 'react-plotly.js';
import {Button, Checkbox, FormControl, FormControlLabel} from "@mui/material";
import {CSVLink} from "react-csv";
import {colsToRows} from "../utils/utils";

const DataPlot = ({handleCheckboxChange, plotPageValues, prevStep}) => {

    const fileName = "BN_filter_results.csv";
    const [displayConfInterval, setDisplayConfInterval] = useState(plotPageValues.displayConfInterval)

    const trend = [{
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
    }];

    const trendConfInt = [
        {
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
            isConfInterval: true, // custom attr to distinguish confidence intervals
        },
        { // confint upper bound
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
            isConfInterval: true, // custom attr to distinguish confidence intervals
        },
    ];

    const series = [
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
    ];

    const cycleConfInt = [
        {
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
            isConfInterval: true, // custom attr to distinguish confidence intervals
        },
        { // confint upper bound
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
            isConfInterval: true, // custom attr to distinguish confidence intervals
        },
    ]

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

    const allPlotData = [...trend, ...trendConfInt, ...series, ...cycle, ...cycleConfInt,];
    const plotDataWithoutConfInt = [...trend, ...series, ...cycle,];
    // TODO: remove above
    // TODO: refine logic when CIs are available
    const [plotData, setPlotData] = useState(displayConfInterval ? allPlotData : plotDataWithoutConfInt);
    const [plotLayout, setPlotLayout] = useState(layout);

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

    const handleConfInt = (isDisplayConfInt) => {
        const lineVisibilityByGroup = plotData.reduce((acc, plotAttribute) => {
            if (plotAttribute?.isConfInterval !== true)
                return {...acc, [plotAttribute.legendgroup]: plotAttribute.visible};
            return acc;
        }, {});

        console.log(plotData)

        return plotData.map(
            plotAttribute => {
                if (plotAttribute?.isConfInterval === true) {
                    if (lineVisibilityByGroup[plotAttribute.legendgroup] === true)
                        return {...plotAttribute, visible: isDisplayConfInt};
                    else if (lineVisibilityByGroup[plotAttribute.legendgroup] === 'legendonly')
                        return {...plotAttribute, visible: 'legendonly'};
                }
                return plotAttribute;
            }
        );
    }

    const onLegendClick = (clickData) => {
        // Ensures plotting internal state is consistent with React state
        // TODO has state prior

        setPlotData(clickData.data.map((plotAttr, idx) => ({...clickData[idx], ...plotAttr})));

        console.log("clickData.data", clickData.data)

        const lineVisibilityByGroup = plotData.reduce((acc, plotAttribute) => {
            if (plotAttribute?.isConfInterval !== true)
                return {...acc, [plotAttribute.legendgroup]: plotAttribute.visible};
            return acc
        }, {});


    }

    const getPlot = () => {
        console.log("getPlot", plotData)
        return(
        <Plot
            layout={plotLayout}
            data={plotData}
            onLegendClick={onLegendClick}
            onLegendDoubleClick={onLegendClick}
        />
    )}


    return (<>
            <div style={{minHeight: 600,}}>

                <div className="information">
                    <p>
                        Select from the legend of the plot below to toggle between plotting trend and/or cycle. The
                        scale for the trend/cycle is given on the left/right axis.
                    </p>
                </div>
                <div>
                    {getPlot()}
                </div>
                <FormControl sx={{marginBottom: 0, marginTop: -1.5}} variant="standard">
                    <FormControlLabel label="95% Confidence Intervals"
                                      title="Choose to report 95% confidence intervals (in both plot and CSV)"
                                      control={<Checkbox
                                          size="small"
                                          onChange={e => {
                                              const isDisplayConfInt = e.target.checked
                                              setDisplayConfInterval(isDisplayConfInt);
                                              setPlotData(handleConfInt(isDisplayConfInt));
                                          }}
                                          checked={displayConfInterval}/>}
                    />
                </FormControl>
                <div style={{marginBottom: 10}}>
                    <strong>Delta:</strong> {plotPageValues.deltaCalc.toFixed(4) /* delta reported to 4 d.p. */}
                </div>
                <CSVLink style={{textDecoration: "underline", marginBottom: 7}}
                         filename={fileName} data={getCSVData()}>Download as CSV</CSVLink>
            </div>
            <Button
                variant="outlined"
                style={styles.button}
                onClick={back}
                // TODO: update global state of CI
            >Back</Button>
        </>
    );

}

const styles = {
    button: {
        minHeight: "45px",
        minWidth: "100px",
        margin: "15px 20px 100px",
    }
}

export default DataPlot