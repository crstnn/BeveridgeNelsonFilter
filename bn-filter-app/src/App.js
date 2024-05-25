import './styles/App.css';
import BasePage from './components/BasePage';
import React, {useEffect, useState} from "react";
import {CONFIG} from "./config.js";
import ReactGA from 'react-ga4';
import {Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {FRED, LOADING_STEP, MODEL_QUERY_PARAMS} from "./utils/consts";
import {keyValueArraysToObject, maybeConvertStringToBool, maybeConvertStringToNumber} from "./utils/utils";
import {DateAbstract} from "./utils/date";

const {analytics: {GA}} = CONFIG;

ReactGA.initialize(GA.BASE_PAGE_TRACKING_ID);


const App = () => {

    useEffect(() => {
        console.log('registered App for GA');
        ReactGA.send({hitType: "pageview", page: window.location.pathname});
    }, []);

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    let [initialState, setInitialState] = useState({});

    useEffect(() => {
        console.log("deeplink apply useEffect")
        if (location.pathname.endsWith('/apply')) {
            console.log("deeplink apply useEffect /apply=true")
            const queryParamValues = MODEL_QUERY_PARAMS
                .map(x => searchParams.get(x))
                .map(maybeConvertStringToBool)
                .map(maybeConvertStringToNumber)
                .map(DateAbstract.maybeConvertStringToDate);
            const queryParams = keyValueArraysToObject(MODEL_QUERY_PARAMS, queryParamValues);


            setInitialState({
                isDeeplinkApply: true,
                step: LOADING_STEP,
                isLoading: true,
                dataInputType: FRED,
                ...queryParams,
            });

            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Route path="/" element={<BasePage {...{initialState: initialState}}/>}/>
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
