import {Alert} from "@mui/material";
import React from "react";

const Error = ({close, tagName}) => (
    <div style={{maxWidth: 640, margin: "0 auto 16px", textAlign: "left"}}>
        <Alert variant="filled" severity="error"
               onClose={close}>
            {tagName}
        </Alert>
    </div>)


export default Error
