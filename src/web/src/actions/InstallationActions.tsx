import * as ApiClient from '../../../api/ApiClient';
import config from '../Config';
import { IAction } from './IAction';
import { InstallationClient } from '../apiclient/InstallationClient';

export class InstallationActions {
    static LoadStatus = 'LOAD_INSTALLATION_STATUS';
    static SetStatus = 'SET_INSTALLATION_STATUS';
    static Install = 'INSTALL';
    static SetInstallationMessage = 'SET_INSTALLATION_MESSAGE';
    static SetInstallationDescription = 'SET_INSTALLATION_DESCRIPTION';
    static FinishInstall = 'FINISH_INSTALL';
}

export const loadInstallationStatus = (dispatch: any): IAction => {

    dispatch(setInstallationStatusMessage('Checking installation status...'));

    let client = new InstallationClient(new ApiClient.InstallationClient(config.apiUrl));
    let statusResult = client.getStatus();
    statusResult
        .then((result: ApiClient.GlobalJsonResultOfInstallationStatusResult) => {
            let setAuthAction: IAction = setAuthenticationResult(result);
            dispatch(setAuthAction);
            dispatch(setInstallationStatusMessage('Finished checking installation status'));
        });

    return {
        type: InstallationActions.LoadStatus,
        value: null
    }
};

export const setAuthenticationResult = (result: ApiClient.GlobalJsonResultOfInstallationStatusResult): IAction => {
    return {
        type: InstallationActions.SetStatus,
        value: result
    }
}

export const setInstallationStatusMessage = (message: string): IAction => {
    return {
        type: InstallationActions.SetInstallationMessage,
        value: message
    }
}

export const setInstallationStatusDescription = (description: string): IAction => {
    return {
        type: InstallationActions.SetInstallationDescription,
        value: description
    }
}

export const install = (dispatch: any, previousResult: ApiClient.GlobalJsonResultOfInstallationResult = null): IAction => {

    let client = new InstallationClient(new ApiClient.InstallationClient(config.apiUrl));

    if (previousResult === null) {
        let startInstallResult = client.startInstallation();
        startInstallResult
            .then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
                return install(dispatch, result);
            });

        return {
            type: InstallationActions.Install,
            value: null
        }
    }

    if (!previousResult.successful || (previousResult.result.isSuccess && !previousResult.result.moreToInstall)) {
        dispatch(finishInstallation(previousResult));
    }

    if (!previousResult.result.isSuccess) {
        dispatch(setInstallationStatusMessage('Failed installation.Rolling back...'));
        client.rollback(previousResult)
            .then((result: ApiClient.GlobalJsonResultOfRollbackResult) => {
                dispatch(finishInstallation(previousResult));
            });
    }

    if (previousResult.result.isSuccess && previousResult.result.moreToInstall) {
        let nextResult = client.installNextComponent(previousResult);
        nextResult.then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
            dispatch(setInstallationStatusDescription(previousResult.result.nextComponentDescription));
            install(dispatch, result);
        });
    }

    dispatch(setInstallationStatusMessage('Starting installation...'));

    return {
        type: InstallationActions.Install,
        value: null
    }
}

export const finishInstallation = (result: ApiClient.GlobalJsonResultOfInstallationResult): IAction => {
    return {
        type: InstallationActions.FinishInstall,
        value: result
    }
}
