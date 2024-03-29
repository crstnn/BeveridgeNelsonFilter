import './styles/App.css';
import BasePage from './components/BasePage';
import React from "react";


function App() {

    return (
        <>
            <div className="App">
                <header className="appHeader">
                    BN Filter Trend-Cycle Decomposition
                </header>

                <div className="information welcomeInformation">
                    <p>This tool performs trend-cycle decomposition.
                        It is implemented using the Beveridge-Nelson filter method described in <a target="_blank"
                                                                                                   rel="noopener noreferrer"
                                                                                                   href="https://doi.org/10.1162/rest_a_00691">
                            Kamber, Morley, and Wong (2018)</a> and the refined version described in <a target="_blank"
                                                                                                 rel="noopener noreferrer"
                                                                                                 href="https://ideas.repec.org/p/een/camaaa/2024-24.html">
                            Kamber, Morley, and Wong (2024)</a>.
                    </p>
                </div>
                <BasePage/>
            </div>
            <div style={styles.footer}>
                <a href="https://sites.google.com/site/guneskamber" rel="noopener noreferrer" target="_blank">
                    Gunes Kamber</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://sites.google.com/site/jamescmorley" rel="noopener noreferrer" target="_blank">
                    James Morley</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://sites.google.com/site/benjaminwongshijie" rel="noopener noreferrer"
                   target="_blank">
                    Benjamin Wong</a>
                <br/>
                <div style={styles.feature}>
                    <a href="https://crstnn.github.io/" rel="noopener noreferrer" target="_blank">@cristian</a>
                </div>
            </div>
        </>
    );
}

const styles = {
    footer: {
        fontSize: "small",
        backgroundColor: "#F7F7F7",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "10px",
        marginTop: "10px",
        position: "fixed",
        overflowX: "hidden",
        left: "0",
        bottom: "0",
        width: "100%",
        zIndex: 1,
    },
    feature: {
        marginTop: "5px",
        fontSize: "x-small",
    }
};


export default App;
