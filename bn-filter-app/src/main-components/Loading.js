import {Circles} from "react-loader-spinner";
import React from "react";

const Loading = () =>
    (
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "96px 0"
        }}>
            <Circles height={64} width={64} color='#0a6782' ariaLabel='Running the BN filter'/>
        </div>)


export default Loading;