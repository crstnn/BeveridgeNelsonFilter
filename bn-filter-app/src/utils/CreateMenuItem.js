import {MenuItem} from "@mui/material";
import React from "react";

const createMenuItems = (option) => option.map( (item) => <MenuItem value={item.value}>{item.text}</MenuItem>)

export default createMenuItems