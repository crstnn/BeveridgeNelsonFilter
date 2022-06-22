import './styles/App.css';
import BasePage from './components/BasePage';
import React from "react";


function App() {

    return (
        <div className="App">
            <header className="appHeader">
                BN Filter Trend-Cycle Decomposition
            </header>

            <div className="information welcomeInformation">
                <p>This tool performs trend-cycle decomposition.
                    It is implemented using the Beveridge-Nelson filter method described in <a target="_blank"
                                                                                               rel="noopener noreferrer"
                                                                                               href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3434174">
                        Kamber, Morley, and Wong</a>. Please note that this website is still in development so some features are yet to be implemented/completed.
                </p>

            </div>
            <BasePage/>
        </div>
    );
}

export default App;
