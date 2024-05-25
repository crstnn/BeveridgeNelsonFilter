import './styles/App.css';
import BasePage from './components/BasePage';
import React, {useEffect} from "react";
import {CONFIG} from "./config.js";
import ReactGA from 'react-ga4';
import {Route, Routes} from "react-router-dom";

const {analytics: {GA}} = CONFIG;

ReactGA.initialize(GA.BASE_PAGE_TRACKING_ID);


const App = () => {

    useEffect(() => {
        console.log('registered App for GA');
        ReactGA.send({hitType: "pageview", page: window.location.pathname});
    }, []);

    return (
        <>
            <div className="App">
                <header className="appHeader">
                    BN Filter Trend-Cycle Decomposition
                </header>

                <div className="information welcomeInformation">
                    <p>This tool performs trend-cycle decomposition using the Beveridge-Nelson filter in <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://doi.org/10.1162/rest_a_00691">
                        Kamber, Morley, and Wong (2018)</a> and the refined version in <a target="_blank"
                                                                                          rel="noopener noreferrer"
                                                                                          href="https://ideas.repec.org/p/een/camaaa/2024-24.html">
                        Kamber, Morley, and Wong (2024)</a>.
                    </p>
                </div>

                <Routes>
                    {/* Routes to BasePage when '/' or '/apply' */}
                    <Route path="/apply?/" element={<BasePage/>}/>
                </Routes>

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
