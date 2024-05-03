import React, {useMemo, useState} from "react";
import Plot from 'react-plotly.js';
import {Button, Checkbox, FormControl, FormControlLabel} from "@mui/material";
import {CSVLink} from "react-csv";
import {colsToRows} from "../utils/utils";


const DataPlot = ({handleCheckboxChange, plotPageValues, prevStep}) => {

    const fileName = "BN_filter_results.csv";
    const [displayConfInterval, setDisplayConfInterval] = useState(plotPageValues.displayConfInterval);
    // Used to trigger re-render of plot. This circumvents react-plotly's plot refreshing convention.
    const [revisionNumber, setRevisionNumber] = useState(0);
    const incrementRevisionNumber = () => setRevisionNumber(revisionNumber + 1);

    const visibleAxisDisplay = {showgrid: true, visible: true, zeroline: true};
    const invisibleAxisDisplay = {showgrid: false, visible: false, zeroline: false};

    const trend = {
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
    };

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
            name: 'trend_ci',
            legendgroup: 'trend',
            yaxis: 'y1',
            visible: displayConfInterval,
        },
        { // confint upper bound
            x: plotPageValues.x,
            y: plotPageValues.trendCIUB,
            fill: "tonexty",
            fillcolor: "rgba(255,145,0,0.25)",
            line: {color: "transparent"},
            showlegend: false,
            type: "scatter",
            hoverinfo: 'skip',
            name: 'trend_ci',
            legendgroup: 'trend',
            yaxis: 'y1',
            visible: displayConfInterval,
        },
    ];

    const series =
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
        };


    const cycle =
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
        };

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
            name: 'cycle_ci',
            legendgroup: 'cycle',
            yaxis: 'y2',
            visible: displayConfInterval ? 'legendonly' : false,
        },
        { // confint upper bound
            x: plotPageValues.x,
            y: plotPageValues.cycleCIUB,
            fill: "tonexty",
            fillcolor: "rgba(0,100,80,0.2)",
            line: {color: "transparent"},
            showlegend: false,
            type: "scatter",
            hoverinfo: 'skip',
            name: 'cycle_ci',
            legendgroup: 'cycle',
            yaxis: 'y2',
            visible: displayConfInterval ? 'legendonly' : false,
        },
    ];

    const layout =
        {
            autosize: true,
            uirevision: 'true',  // essential to prevent user interactions being reset on a redrawing of the plot
            margin: {l: 30, r: 30, b: 50, t: 30},
            xaxis: {automargin: true},
            yaxis: {
                tickangle: 'auto',
                ...(trend.visible === true ? visibleAxisDisplay : invisibleAxisDisplay),
            },
            yaxis2: {
                overlaying: 'y',
                side: 'right',
                automargin: true,
                ...(cycle.visible === true ? visibleAxisDisplay : invisibleAxisDisplay),
            },
            legend: {
                orientation: "h",
                xanchor: "center",
                x: 0.5,
                y: -0.10,
                traceorder: 'normal',
            },
        };

    const allPlotData = [trend, ...trendConfInt, series, cycle, ...cycleConfInt,];
    const [plotData, setPlotData] = useState(allPlotData);
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

    const getLineVisibilityByGroup = (data) => data.reduce((acc, plotAttribute) =>
            !plotAttribute.name.endsWith('ci') ? {...acc, [plotAttribute.legendgroup]: plotAttribute.visible} : acc
        , {});

    const handleConfIntervalDisplay = (isDisplayConfInt) => {
        setDisplayConfInterval(isDisplayConfInt);

        const lineVisibilityByGroup = getLineVisibilityByGroup(plotData);

        setPlotData(plotData.map(
                plotAttribute => {
                    if (plotAttribute.name.endsWith('ci')) {
                        if (lineVisibilityByGroup[plotAttribute.legendgroup] === true)
                            return {...plotAttribute, visible: isDisplayConfInt};
                        else if (lineVisibilityByGroup[plotAttribute.legendgroup] === 'legendonly' && !isDisplayConfInt)
                            return {...plotAttribute, visible: false};
                        else if (lineVisibilityByGroup[plotAttribute.legendgroup] === 'legendonly' && isDisplayConfInt)
                            return {...plotAttribute, visible: 'legendonly'};
                    }
                    return plotAttribute;
                }
            )
        );
        incrementRevisionNumber();
    }

    const handleYAxisDisplay = ({curveNumber}) => {
        // Note that `onLegendClick` occurs before the plot state for that event is reflected (in the state).
        const curveData = plotData[curveNumber]
        const axisDisplayProperties = curveData.visible === true ? invisibleAxisDisplay : visibleAxisDisplay;
        const axisOfCurve = curveData.yaxis.slice(-1) === '2' ? 2 : 1;
        const axisOfCurveKey = `yaxis${axisOfCurve === 2 ? '2' : ''}`;
        const newLayout = {
            ...plotLayout,
            [axisOfCurveKey]: {...plotLayout[axisOfCurveKey], ...axisDisplayProperties,}
        };

        setPlotLayout(newLayout);
        incrementRevisionNumber();
    }

    const plot = useMemo(() => {
        return (
            <Plot
                layout={plotLayout}
                data={plotData}
                config={{displaylogo: false, modeBarButtonsToRemove: ['resetScale2d']}}
                useResizeHandler={true}
                style={{maxWidth: 700, marginLeft: 'auto', marginRight: 'auto',}}
                onLegendClick={handleYAxisDisplay}
                onLegendDoubleClick={() => false} // disabled
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revisionNumber]);

    const {cycleCI} = plotPageValues;
    const isConfIntNotEstimated = useMemo(() => cycleCI.includes(null) || cycleCI.includes(undefined),
        [cycleCI]);

    return (<>
            <div style={{minHeight: 600,}}>
                <div className="information">
                    <p>
                        Select from the legend of the interactive plot below to toggle between plotting trend and/or
                        cycle. The scale for the trend/cycle is given on the left/right axis.
                    </p>
                </div>
                <div>
                    {plot}
                </div>
                <FormControl variant="standard">
                    <FormControlLabel label="95% Confidence Intervals"
                                      title={isConfIntNotEstimated ?
                                          "There was a computational issue when calculating the confidence intervals. Try with a higher value of delta or consider working with the Matlab or R code" :
                                          "Choose to report 95% confidence intervals (in both plot and CSV)"}
                                      control={<Checkbox
                                          size="small"
                                          onChange={e => handleConfIntervalDisplay(e.target.checked)}
                                          checked={displayConfInterval && !isConfIntNotEstimated}
                                          disabled={isConfIntNotEstimated}
                                      />}
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
                onClick={(e) => {
                    handleCheckboxChange('displayConfInterval')({target: {checked: displayConfInterval}})
                    back(e)
                }}
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

export default DataPlot;