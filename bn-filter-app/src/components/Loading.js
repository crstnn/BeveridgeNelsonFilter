import {Circles} from "react-loader-spinner";
import React from "react";

const Loading = () =>
    (
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "30vh"
        }}>
            <Circles height={75} width={75} color='grey'/>
        </div>)


export default Loading;