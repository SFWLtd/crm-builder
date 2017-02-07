import { combineReducers } from 'redux';
import { IInstallationState } from '../state/InstallationState';
import { IAction } from '../actions/IAction';
import { InstallationActions } from '../actions/InstallationActions';

const installationReducer = (state: IInstallationState, action: IAction): IInstallationState => {

    let newState = state;

    switch (action.type) {
        case InstallationActions.LoadStatus:
            newState.status.hasStarted = true;
            newState.status.hasCompleted = false;
            break;
        case InstallationActions.SetStatus:
            newState.status.hasCompleted = true;
            newState.status.hasStarted = false;
            newState.status.result = action.value;
            newState.hasLoadedState = true;
            newState.message = '';
            newState.description = '';
            break;
        case InstallationActions.Install:
            newState.installation.hasStarted = true;
            newState.installation.hasCompleted = false;
            break;
        case InstallationActions.FinishInstall:
            newState.installation.hasCompleted = true;
            newState.installation.hasStarted = false;
            newState.installation.result = action.value;
            newState.message = '';
            newState.description = '';
            break;
        case InstallationActions.SetInstallationMessage:
            newState.message = action.value;
            break;
        case InstallationActions.SetInstallationDescription:
            newState.description = action.value;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
}

export default installationReducer;