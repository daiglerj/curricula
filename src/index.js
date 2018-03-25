import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import {store} from "./store"
import {persistor} from "./store"

import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

                <MuiThemeProvider>
                    <App />
                </MuiThemeProvider>
          </PersistGate>

        </Provider>,

    
    document.getElementById('root'));
registerServiceWorker();
