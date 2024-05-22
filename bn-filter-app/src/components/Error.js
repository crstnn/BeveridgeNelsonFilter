import {Alert} from "@mui/material";
import React from "react";

const Error = ({close, tagName}) => (
    <div style={{margin: "2px 20%"}}>
        <Alert variant="filled" severity="error"
               onClose={close}>
            {tagName}
        </Alert>
    </div>)


export default Error
