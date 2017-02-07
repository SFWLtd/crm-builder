import { combineReducers } from 'redux';
import authenticationReducer from './AuthenticationReducer';
import navigationReducer from './NavigationReducer';
import installationReducer from './InstallationReducer';
import buildReducer from './BuildsReducer';
import * as AppState from '../state/AppState';
import { IAction } from '../actions/IAction';

const appReducer = (state: AppState.IAppState = AppState.defaultAppState, action: IAction): AppState.IAppState => {
    return {
        authenticationState: authenticationReducer(state.authenticationState, action),
        navigationState: navigationReducer(state.navigationState, action),
        installationState: installationReducer(state.installationState, action),
        buildState: buildReducer(state.buildState, action)
    }
}

const appInternalReducer = (state: AppState.IAppState, action: IAction): AppState.IAppState => {
    let newState = state;

    // todo:

    return (Object as any).assign({}, state, {}, { newState });
}

export default appReducer;