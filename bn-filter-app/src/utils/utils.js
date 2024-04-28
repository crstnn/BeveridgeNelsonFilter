import {MenuItem} from "@mui/material";
import React from "react";

const colsToRows = (...columns) => {

    columns = columns.filter(x => x !== undefined)

    // Pre-condition: All arrays are same length
    const
        rowLength = columns.length,
        colLength = columns[0].length;

    const retArr = [];

    for (let c = 0; c < colLength; c++) {
        const row = [];
        for (let r = 0; r < rowLength; r++) {
            row.push(columns[r][c]);
        }
        retArr.push(row);
    }
    return retArr;
};

const confIntZip = (cycle, ci, bound) => cycle.map((x, i) => ci[i] !== null ? bound === "lb" ? x - ci[i] : /* ub */ x + ci[i] : undefined);

const pairToParam = (paramName, currPair) =>
    paramName + currPair[0].toString() + '=' + currPair[1].toString() + '&';

const pairArrayToParamStr = arr => arr.reduce(pairToParam, '?');

async function fetchWithTimeout(url, timeout = 20000) { // 20 second timeout
    const
        controller = new AbortController(),
        timeoutID = setTimeout(() => controller.abort(), timeout),
        f = await fetch(url, {signal: controller.signal});
    clearTimeout(timeoutID);
    return f;
}

const createMenuItems = option => option.map((item) => <MenuItem value={item.value}>{item.text}</MenuItem>)

const createHoverText = option => {
    const hoverText = {};
    option.forEach(x => hoverText[x.value] = x.hoverText);
    return fieldItem => hoverText[fieldItem];
}

export {colsToRows, confIntZip, fetchWithTimeout, pairArrayToParamStr, createMenuItems, createHoverText}