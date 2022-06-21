import {Alert} from "@mui/material";
import React, {Component} from "react";

export class ServerError extends Component {

    render() {
        return (
            <div style={{margin: "2px 20%"}}>
                <Alert variant="filled" severity="error"
                       onClose={this.props.close}>
                    During the running of the BN filter a problem occurred.
                    Please check that the inputs are appropriate.
                </Alert>
            </div>)
    }
}

export default ServerError
