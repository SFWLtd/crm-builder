import * as ApiClient from '../../../../api/ApiClient';
import config from '../../Config';
import { IAction } from '../IAction';
import { InstallationActions } from './InstallationActions';
import { InstallationClient } from '../../apiclient/installation/InstallationClient';

export const loadInstallationStatus = (dispatch: any): IAction => {

    let client = new InstallationClient(new ApiClient.InstallationClient(config.apiUrl));
    let statusResult = client.getStatus();
    statusResult
        .then((result: ApiClient.GlobalJsonResultOfInstallationStatusResult) => {
            let setAuthAction: IAction = setAuthenticationResult(result);
            dispatch(setAuthAction);
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
        dispatch(setInstallationMessage('Failed. Rolling back...'));
        client.rollback(previousResult)
            .then((result: ApiClient.GlobalJsonResultOfRollbackResult) => {
                dispatch(finishInstallation(previousResult));
            });
    }

    if (previousResult.result.isSuccess && previousResult.result.moreToInstall) {
        dispatch(setInstallationMessage(previousResult.result.nextComponentDescription));
        let nextResult = client.installNextComponent(previousResult);
        nextResult.then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
            install(dispatch, result);
        });
    }

    return {
        type: InstallationActions.Install,
        value: null
    }
}

export const setInstallationMessage = (message: string): IAction => {
    return {
        type: InstallationActions.SetLatestInstallationMessage,
        value: message
    }
}


export const finishInstallation = (result: ApiClient.GlobalJsonResultOfInstallationResult): IAction => {
    return {
        type: InstallationActions.FinishInstall,
        value: result
    }
}
