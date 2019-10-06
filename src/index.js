import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/root/app.component.js';
import M from 'materialize-css'
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';


const store = createStore(rootReducer);
// store.subscribe(() => console.log("store", store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
