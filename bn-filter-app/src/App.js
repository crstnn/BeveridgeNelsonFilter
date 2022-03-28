import './styles/App.css';
import UserForm from './components/UserForm';
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
                        Kamber, Morley, and Wong</a>.
                </p>

            </div>
            <UserForm/>
        </div>
    );
}

export default App;
