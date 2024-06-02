import React from 'react';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter> {/* @NOTE: using of 404-page workaround for GH Pages working solution */}
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
