// React & Defined Components
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
// Redux
import { Provider } from "react-redux";
import { store } from "./store/store";
// Others
import { reportWebVitals } from "./others/reportWebVitals";

// React Strict Mode should not be removed, use it for monitoring potential problems.
// Provider used to provide Redux store state for components to use.
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// To start measuring app performance, pass a function to log results (eg. reportWebVitals(console.log))
reportWebVitals();
