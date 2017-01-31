import { combineReducers } from 'redux';
import authenticationReducer from './authentication/AuthenticationReducer';
import * as AppState from '../state/IAppState';
import { IAction } from '../actions/IAction';

const appReducer = (state: AppState.IAppState = AppState.defaultAppState, action: IAction): AppState.IAppState => {
    return {
        authenticationState: authenticationReducer(state.authenticationState, action)
    }
}

export default appReducer;