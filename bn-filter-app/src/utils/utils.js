import {MenuItem} from "@mui/material";
import React from "react";
import {MODEL_PARAMS, MODEL_QUERY_PARAMS, TRANSFORMATION_PARAMS, TRANSFORMATION_QUERY_PARAMS} from "./consts";
import {DateAbstract} from "./date";

export const colsToRows = (...columns) => {

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

const zip = (array1, array2) => array1.map((k, i) => [k, array2[i]]);

export const confIntZip = (cycle, ci, bound) => cycle.map((x, i) => ci[i] !== null ? bound === "lower" ? x - ci[i] : /* upper */ x + ci[i] : undefined);

const pairToParam = (paramName, currPair) =>
    paramName + currPair[0].toString() + '=' + currPair[1].toString() + '&';

export const pairArrayToParamStr = arr => arr.reduce(pairToParam, '?').slice(0, -1);

export async function fetchWithTimeout(url, timeout = 20000) { // 20 second timeout
    const
        controller = new AbortController(),
        timeoutID = setTimeout(() => controller.abort(), timeout),
        f = await fetch(url, {signal: controller.signal});
    clearTimeout(timeoutID);
    return f;
}

export const createMenuItems = option => option.map((item) => <MenuItem value={item.value}>{item.text}</MenuItem>)

export const createHoverText = option => {
    const hoverText = {};
    option.forEach(x => hoverText[x.value] = x.hoverText);
    return fieldItem => hoverText[fieldItem];
}

export const maybeConvertStringToBool = str => {
    if (str?.toLowerCase?.() === 'true') return true;
    else if (str?.toLowerCase?.() === 'false') return false;
    return str;
}

export const maybeConvertStringToNumber = str => {
    if (/^[0-9]+[.]?[0-9]*$/.test(str)) return parseFloat(str);
    return str;
}

export const keyValueArraysToObject = (keyArray, valueArray) =>
    Object.fromEntries(keyArray.map((_, i) => [keyArray[i], valueArray[i]]));

export const extractModelParams = valueObject => {
    const isTransformApplied = valueObject['transform'] === true;

    const queryParams = isTransformApplied ? [...MODEL_QUERY_PARAMS, ...TRANSFORMATION_QUERY_PARAMS] : MODEL_QUERY_PARAMS;
    const params = isTransformApplied ? [...MODEL_PARAMS, ...TRANSFORMATION_PARAMS] : MODEL_PARAMS;

    return zip(queryParams,
        params.map(
            key => valueObject?.[key] instanceof Date ? DateAbstract.truncatedDate(valueObject?.[key]) : valueObject?.[key]
        )
    );
};


export const buildModelApplicationUrl = paramPairs => `${window.location.origin}/apply${pairArrayToParamStr(paramPairs)}`;
