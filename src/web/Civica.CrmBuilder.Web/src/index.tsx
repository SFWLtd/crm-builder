import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import appReducer from './reducers/AppReducer';
import App from './containers/App';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={createStore(appReducer)}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
