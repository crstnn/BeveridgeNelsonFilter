import './styles/App.css';
import BasePage from './main-components/BasePage';
import React, {useEffect, useState} from "react";
import {CONFIG} from "./config.js";
import ReactGA from 'react-ga4';
import {Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import {
    FRED,
    LOADING_STEP,
    MODEL_PARAMS,
    MODEL_QUERY_PARAMS,
    NO_TRANSFORMATION_KEY_VALUES,
    TRANSFORMATION_PARAMS,
    TRANSFORMATION_QUERY_PARAMS
} from "./utils/consts";
import {keyValueArraysToObject, maybeConvertStringToBool, maybeConvertStringToNumber} from "./utils/utils";
import {DateAbstract} from "./utils/date";

const {analytics: {GA}} = CONFIG;

ReactGA.initialize(GA.BASE_PAGE_TRACKING_ID);


const App = () => {

    useEffect(() => {
        console.log('registered App for GA');
        ReactGA.send({hitType: "pageview", page: window.location.pathname});
    }, []);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    let [initialState, setInitialState] = useState({});

    useEffect(() => {
        if (window.location.hash.startsWith('#/apply')) {
            const queryParamValues = [...MODEL_QUERY_PARAMS, ...TRANSFORMATION_QUERY_PARAMS]
                .map(x => searchParams.get(x))
                .map(maybeConvertStringToBool)
                .map(maybeConvertStringToNumber)
                .map(DateAbstract.maybeConvertStringToDate);

            const modelParamsFromQueryString = keyValueArraysToObject([...MODEL_PARAMS, ...TRANSFORMATION_PARAMS], queryParamValues);

            const isTransformApplied = modelParamsFromQueryString['transform'] === true;

            const modelParams = isTransformApplied ? modelParamsFromQueryString : {...modelParamsFromQueryString, ...NO_TRANSFORMATION_KEY_VALUES,};

            if (!Object.values(modelParams).some(e => e === null)) {
                // if missing/malformed query param keys don't apply deeplink
                setInitialState({
                    isDeeplinkApply: true,
                    step: LOADING_STEP,
                    isLoading: true,
                    dataInputType: FRED,
                    ...modelParams,
                });
            }

            navigate('', {replace: true});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.hash]);

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
                                                                                          href="https://doi.org/10.1016/j.jedc.2025.105066">
                        Kamber, Morley, and Wong (2024)</a>.
                    </p>
                </div>

                <Routes>
                    <Route path="/" element={<BasePage {...{initialState: initialState}}/>}/>
                    <Route path="/apply" element={<></>}/>
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
