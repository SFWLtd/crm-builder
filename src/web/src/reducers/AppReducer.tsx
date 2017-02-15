import { combineReducers } from "redux";
import { IAction } from "../actions/IAction";
import * as AppState from "../state/AppState";
import authenticationReducer from "./AuthenticationReducer";
import buildReducer from "./BuildsReducer";
import installationReducer from "./InstallationReducer";
import navigationReducer from "./NavigationReducer";
import solutionsReducer from "./SolutionsReducer";

const appReducer = (state: AppState.IAppState = AppState.defaultAppState, action: IAction): AppState.IAppState => {
    return {
        authenticationState: authenticationReducer(state.authenticationState, action),
        buildState: buildReducer(state.buildState, action),
        installationState: installationReducer(state.installationState, action),
        navigationState: navigationReducer(state.navigationState, action),
        solutionsState: solutionsReducer(state.solutionsState, action),
    };
};

const appInternalReducer = (state: AppState.IAppState, action: IAction): AppState.IAppState => {
    let newState = state;

    // todo:

    return (Object as any).assign({}, state, {}, { newState });
};

export default appReducer;
