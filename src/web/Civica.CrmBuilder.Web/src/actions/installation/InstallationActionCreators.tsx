import * as ApiClient from '../../../../../api/ApiClient';
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
