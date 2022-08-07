import {MenuItem} from "@mui/material";
import React from "react";

const createMenuItems = option => option.map((item) => <MenuItem value={item.value}>{item.text}</MenuItem>)

const createHoverText = option => {
    const hoverText = {};
    option.forEach(x => hoverText[x.value] = x.hoverText);
    return fieldItem => hoverText[fieldItem];
}

export {createMenuItems, createHoverText}