import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'; // css reset.
import App from './components/app';
import { StylesProvider } from '@material-ui/core';

ReactDOM.render(
    <React.StrictMode>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
