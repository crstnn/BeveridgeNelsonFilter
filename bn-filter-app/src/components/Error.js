import React, {Component} from "react";
import {Button} from "@mui/material";

export class Error extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (<div style={{paddingTop: "10vh"}}>During the running of the BN Filter a problem occurred.
            Please check that the inputs are appropriate.
            <br/>
            <br/>
            <Button
                variant="contained"
                style={styles.button}
                onClick={this.back}
            >Back</Button></div>)
    }
}

const styles = {
    button: {
        margin: 60
    }
}
