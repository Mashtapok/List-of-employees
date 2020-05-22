import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
            <CssBaseline/>
            <App/>
    </Provider>,
    document.querySelector('#root'),
);
