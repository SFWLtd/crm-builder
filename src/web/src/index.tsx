import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import appReducer from './reducers/AppReducer';
import App from './containers/App';

ReactDOM.render(
    <Provider store={createStore(appReducer)}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
