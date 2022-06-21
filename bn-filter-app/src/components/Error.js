import {Alert} from "@mui/material";
import React, {Component} from "react";

export class Error extends Component {

    render() {
        return (
            <div style={{margin: "2px 20%"}}>
                <Alert variant="filled" severity="error"
                       onClose={this.props.close}>
                    {this.props.tagName}
                </Alert>
            </div>)
    }
}

export default Error
