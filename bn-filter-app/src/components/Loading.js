import {Circles} from "react-loader-spinner";
import React from "react";

function Loading() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "30vh"
        }}>
            <Circles height={75} width={75} color='grey'/>
        </div>)
}

export default Loading;