import React, {useMemo, useState} from "react";
import Plot from 'react-plotly.js';
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from "@mui/material";
import {CSVLink} from "react-csv";
import {buildModelApplicationUrl, colsToRows, getDifferencingPeriod} from "../utils/utils";
import {FRED} from "../utils/consts";
import ShareButton from "./components/ShareButton";
import InfoIcon from "@mui/icons-material/Info";


const DataPlot = ({setState, plotPageValues, modelParams, prevStep}) => {
    const fileName = `BN_filter_${plotPageValues.dataInputType === FRED ? plotPageValues.mnemonic : 'user_inputted_series'}_results.csv`;
    const {displayConfInterval, displayAdjustedConfInterval, cycleCI, cycleAdjustedCI} = plotPageValues;

    const isConfIntNotEstimated = useMemo(() => cycleCI.includes(null) || cycleCI.includes(undefined),
        [cycleCI]);
    const isAdjustedConfIntNotEstimated = useMemo(() => cycleAdjustedCI.includes(null) || cycleAdjustedCI.includes(undefined),
        [cycleAdjustedCI]);
    const hasNoChosenOutliers = plotPageValues.outliersForSE.length === 0
    const isValidAdjustedConfInt = displayAdjustedConfInterval && !isAdjustedConfIntNotEstimated && !hasNoChosenOutliers

    const defaultCI = isValidAdjustedConfInt ? "adjusted" : (displayConfInterval && !isConfIntNotEstimated ? "normal" : "off");

    // Used to trigger re-render of plot. This circumvents react-plotly's plot refreshing convention.
    const [revisionNumber, setRevisionNumber] = useState(0);
    const incrementRevisionNumber = () => setRevisionNumber(revisionNumber + 1);

    const [confIntSelection, setConfIntSelection] = useState(defaultCI);

    const visibleAxisDisplay = {showgrid: true, visible: true, zeroline: true};
    const invisibleAxisDisplay = {showgrid: false, visible: false, zeroline: false};

    const trend = {
        x: plotPageValues.transformedX,
        y: plotPageValues.trend,
        type: 'scatter',
        mode: 'lines',
        marker: {color: 'orange'},
        name: "Trend",
        showlegend: true,
        legendgroup: 'seriesAndTrend',
        yaxis: 'y1',
        visible: plotPageValues.displaySeriesAndTrend ? true : 'legendonly',
    };

    const trendConfInt = [
        {
            // confint lower bound: enclosing line (which is hidden) hence 0 opacity (using properties of 'tonexty')
            x: plotPageValues.transformedX,
            y: plotPageValues[`trend${confIntSelection === 'adjusted' ? 'Adjusted' : ''}CILB`],
            fill: "tonexty",
            fillcolor: "rgba(0, 0, 0, 0)",
            line: {color: "transparent"},
            showlegend: false,
            type: "scatter",
            hoverinfo: 'skip',
            name: 'trend_lower_ci',
            legendgroup: 'seriesAndTrend',
            yaxis: 'y1',
            visible: defaultCI !== 'off' ? (plotPageValues.displaySeriesAndTrend ? true : 'legendonly') : false,
        },
        { // confint upper bound
            x: plotPageValues.transformedX,
            y: plotPageValues[`trend${confIntSelection === 'adjusted' ? 'Adjusted' : ''}CIUB`],
            fill: "tonexty",
            fillcolor: "rgba(255, 145, 0, 0.25)",
            line: {color: "transparent"},
            showlegend: false,
            type: "scatter",
            hoverinfo: 'skip',
            name: 'trend_upper_ci',
            legendgroup: 'seriesAndTrend',
            yaxis: 'y1',
            visible: defaultCI !== 'off' ? (plotPageValues.displaySeriesAndTrend ? true : 'legendonly') : false,
        },
    ];

    const series =
        {
            x: plotPageValues.transformedX,
            y: plotPageValues.transformedY,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'grey'},
            name: `Series${plotPageValues.transform ? ' (Post-Transformation)' : ''}`,
            showlegend: true,
            legendgroup: 'seriesAndTrend',
            yaxis: 'y1',
            visible: plotPageValues.displaySeriesAndTrend ? true : 'legendonly',
        };


    const cycle =
        {
            x: plotPageValues.transformedX,
            y: plotPageValues.cycle,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
            name: "Cycle",
            showlegend: true,
            legendgroup: 'cycle',
            yaxis: 'y2',
            visible: plotPageValues.displayCycle ? true : 'legendonly',
        };

    const cycleConfInt = [
        {
            // confint lower bound: enclosing line (which is hidden) hence 0 opacity (using properties of 'tonexty')
            x: plotPageValues.transformedX,
            y: plotPageValues[`cycle${confIntSelection === 'adjusted' ? 'Adjusted' : ''}CILB`],
            fill: "tonexty",
            fillcolor: "rgba(0, 0, 0, 0)",
            line: {color: "transparent"},
            showlegend: false,
            type: "scatter",
            hoverinfo: 'skip',
            name: 'cycle_lower_ci',
            legendgroup: 'cycle',
            yaxis: 'y2',
            visible: defaultCI !== 'off' ? (plotPageValues.displayCycle ? true : 'legendonly') : false,
        },
        { // confint upper bound
            x: plotPageValues.transformedX,
            y: plotPageValues[`cycle${confIntSelection === 'adjusted' ? 'Adjusted' : ''}CIUB`],
            fill: "tonexty",
            fillcolor: "rgba(0, 100, 80, 0.2)",
            line: {color: "transparent"},
            showlegend: false,
            type: "scatter",
            hoverinfo: 'skip',
            name: 'cycle_upper_ci',
            legendgroup: 'cycle',
            yaxis: 'y2',
            visible: defaultCI !== 'off' ? (plotPageValues.displayCycle ? true : 'legendonly') : false,
        },
    ];

    const annotationBelowPlotPositioning = -0.17

    const layout =
        {
            autosize: true,
            uirevision: 'true',  // essential to prevent user interactions being reset on a redrawing of the plot
            margin: {l: 30, r: 30, b: 75, t: 30},
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
                y: -0.08,
                traceorder: 'normal',
            },
            annotations: [
                {
                    font: {
                        color: 'grey',
                        size: 9
                    },
                    xref: 'paper',
                    yref: 'paper',
                    x: 1,
                    xanchor: 'right',
                    y: annotationBelowPlotPositioning,
                    yanchor: 'top',
                    text: `Series: ${plotPageValues.dataInputType === FRED ? plotPageValues.mnemonic : 'user inputted series'}`,
                    showarrow: false
                },
                {
                    font: {
                        color: 'grey',
                        size: 9
                    },
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.5,
                    xanchor: 'center',
                    y: annotationBelowPlotPositioning,
                    yanchor: 'top',
                    text: `Delta: ${plotPageValues.deltaCalc.toFixed(4)}`,
                    showarrow: false
                }
            ]
        };

    const allPlotData = [trend, ...trendConfInt, series, cycle, ...cycleConfInt,];
    const [plotData, setPlotData] = useState(allPlotData);
    const [plotLayout, setPlotLayout] = useState(layout);

    const back = e => {
        e.preventDefault();
        prevStep();
    }

    const getCSVData = () => {
        const alignDatesArrayPadding = () => Array(getDifferencingPeriod(plotPageValues.dCode)).fill(null)

        return colsToRows(
            ["date"].concat(plotPageValues.x),
            [`${plotPageValues.dataInputType === FRED ? `${plotPageValues.mnemonic}_` : ''}original_series`].concat(plotPageValues.y),
            plotPageValues.transform ? [`${plotPageValues.dataInputType === FRED ? `${plotPageValues.mnemonic}_` : ''}transformed_series`].concat(alignDatesArrayPadding().concat(plotPageValues.transformedY)) : undefined,
            ["trend"].concat(alignDatesArrayPadding().concat(plotPageValues.trend)),
            ["cycle"].concat(alignDatesArrayPadding().concat(plotPageValues.cycle)),
            displayConfInterval ? ["cycle_conf_int_lower_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.cycleCILB)) : undefined,
            displayConfInterval ? ["cycle_conf_int_upper_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.cycleCIUB)) : undefined,
            displayConfInterval ? ["trend_conf_int_lower_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.trendCILB)) : undefined,
            displayConfInterval ? ["trend_conf_int_upper_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.trendCIUB)) : undefined,
            isValidAdjustedConfInt ? ["cycle_adjusted_conf_int_lower_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.cycleAdjustedCILB)) : undefined,
            isValidAdjustedConfInt ? ["cycle_adjusted_conf_int_upper_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.cycleAdjustedCIUB)) : undefined,
            isValidAdjustedConfInt ? ["trend_adjusted_conf_int_lower_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.trendAdjustedCILB)) : undefined,
            isValidAdjustedConfInt ? ["trend_adjusted_conf_int_upper_bound"].concat(alignDatesArrayPadding().concat(plotPageValues.trendAdjustedCIUB)) : undefined
        )
    };

    const getLineVisibilityByGroup = (data) => data.reduce((acc, plotAttribute) =>
            !plotAttribute.name.endsWith('ci') ? {...acc, [plotAttribute.legendgroup]: plotAttribute.visible} : acc
        , {});

    const handleConfIntervalDisplay = (_event, newSelection) => {
        const currentSelection = newSelection ?? confIntSelection;

        const isDisplayConfInt = currentSelection !== "off"
        const isDisplayNormalConfInt = currentSelection === "normal"
        const isDisplayAdjustedConfInt = currentSelection === "adjusted"

        setConfIntSelection(currentSelection);
        setState({
            displayConfInterval: isDisplayNormalConfInt,
            displayAdjustedConfInterval: isDisplayAdjustedConfInt,
        });

        const lineVisibilityByGroup = getLineVisibilityByGroup(plotData);

        const handleConfIntType = (plotAttrName) => {
            const ciLine = plotAttrName.split('_')[0]
            return plotPageValues[`${ciLine}${isDisplayAdjustedConfInt ? 'Adjusted' : ''}CI${plotAttrName.endsWith('lower_ci') ? 'LB' : 'UB'}`];
        }

        setPlotData(plotData.map(
                plotAttribute => {
                    const plotAttrName = plotAttribute.name
                    if (plotAttrName.endsWith('ci')) {
                        if (lineVisibilityByGroup[plotAttribute.legendgroup] === true)
                            return {...plotAttribute, y: handleConfIntType(plotAttrName), visible: isDisplayConfInt};
                        else if (lineVisibilityByGroup[plotAttribute.legendgroup] === 'legendonly' && !isDisplayConfInt)
                            return {...plotAttribute, visible: false};
                        else if (lineVisibilityByGroup[plotAttribute.legendgroup] === 'legendonly' && isDisplayConfInt) {
                            return {...plotAttribute, y: handleConfIntType(plotAttrName), visible: 'legendonly'};
                        }
                    }
                    return plotAttribute;
                }
            )
        );
        incrementRevisionNumber();
    }

    const handleYAxisDisplay = ({curveNumber}) => {
        // Note that `onLegendClick` occurs before the plot state for that event is reflected (in the state).
        const curveData = plotData[curveNumber];
        const isCurveVisible = curveData.visible === true;
        const axisDisplayProperties = isCurveVisible ? invisibleAxisDisplay : visibleAxisDisplay;
        const axisOfCurve = curveData.yaxis.slice(-1) === '2' ? 2 : 1;
        const axisOfCurveKey = `yaxis${axisOfCurve === 2 ? '2' : ''}`;
        const newLayout = {
            ...plotLayout,
            [axisOfCurveKey]: {...plotLayout[axisOfCurveKey], ...axisDisplayProperties,}
        };

        if (curveData.legendgroup === 'cycle') {
            setState({'displayCycle': !isCurveVisible});
        }
        if (curveData.legendgroup === 'seriesAndTrend') {
            setState({'displaySeriesAndTrend': !isCurveVisible});
        }

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

    const disableAdjustedConfIntButton = isAdjustedConfIntNotEstimated || hasNoChosenOutliers

    const ciMaxButtonHeight = '40px'

    const normalCIButton = (
        <ToggleButton value="normal" sx={{flex: 1, whiteSpace: "nowrap", maxHeight: ciMaxButtonHeight}}
                      disabled={isConfIntNotEstimated}>
            On
        </ToggleButton>)

    const adjustedCIButton = (
        <ToggleButton value="adjusted" sx={{flex: 1, whiteSpace: "nowrap", maxHeight: ciMaxButtonHeight}}
                      disabled={disableAdjustedConfIntButton}
        >
            COVID Adj.<Tooltip
            title="Covid adjusted error bands drop residuals in 2020 corresponding to observations falling between 1 March 2020 - 30 September 2020">
            <IconButton size="small"><InfoIcon fontSize="small"/></IconButton>
        </Tooltip>
        </ToggleButton>)

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
                <div style={{paddingBottom: '1rem', paddingTop: '0.25rem'}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            95% Confidence Intervals
                        </FormLabel>

                        <ToggleButtonGroup
                            value={confIntSelection}
                            color="primary"
                            exclusive
                            sx={{flex: 1, width: '370px'}}
                            onChange={handleConfIntervalDisplay}
                        >
                            <ToggleButton value="off" sx={{
                                flex: 1,
                                whiteSpace: "nowrap",
                                maxHeight: ciMaxButtonHeight
                            }}>Off</ToggleButton>

                            {isConfIntNotEstimated ? (
                                <Tooltip
                                    title="There was a computational issue when calculating the standard confidence intervals. Try with a higher value of delta or consider working with the Matlab or R code"
                                    arrow
                                >
                                    <span>{normalCIButton}</span>
                                </Tooltip>
                            ) : normalCIButton}

                            {disableAdjustedConfIntButton ? (
                                <Tooltip
                                    title={hasNoChosenOutliers ? "This dataset does not have any COVID outliers (dates falling between 1 March 2020 - 30 September 2020)." : "There was a computational issue when calculating the adjusted confidence intervals. Try with a higher value of delta or consider working with the Matlab or R code"}
                                    arrow
                                >
                                    <span>{adjustedCIButton}</span>
                                </Tooltip>
                            ) : adjustedCIButton}

                        </ToggleButtonGroup>
                    </FormControl>
                </div>
                <CSVLink style={{textDecoration: "underline", marginBottom: 7}}
                         filename={fileName} data={getCSVData()}>Download as CSV</CSVLink>

            </div>
            <Grid container direction="column" justifyContent="space-evenly"
                  alignItems="center">
                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        style={styles.button}
                        onClick={back}
                    >Back</Button>
                    {plotPageValues.dataInputType === FRED &&
                        <ShareButton styles={styles}
                                     buttonText={"Share Results"}
                                     lazyShareUrl={_ => buildModelApplicationUrl(modelParams)}
                        />}
                </Grid>
            </Grid>
        </>
    );

}

const styles = {
    button: {
        minHeight: "45px",
        minWidth: "100px",
        margin: "15px 20px 100px",
    },
    shareList: {
        border: "1px solid #d3d3d3",
        borderBottom: "none",
    }
}

export default DataPlot;