import { IAuthenticationState } from './authentication/IAuthenticationState';
import { INavigationState } from './navigation/INavigationState';
import { NavigationIds } from '../constants/NavigationIds';
import * as ApiClient from '../../../../api/ApiClient';
import { IAsyncActionState } from './async/IAsyncActionState';
import { IInstallationState } from './installation/IInstallationState';

export interface IAppState {
    isLoading: boolean;
    authenticationState: IAuthenticationState;
    navigationState: INavigationState;
    installationState: IInstallationState;
}

export const defaultAppState: IAppState = {
    isLoading: true,
    authenticationState: {
        authenticationType: ApiClient.AuthenticationType.Dynamics365,
        crmUrl: { hasBeenTouched: false, value: '' },
        domain: { hasBeenTouched: false, value: '' },
        username: { hasBeenTouched: false, value: '' },
        password: { hasBeenTouched: false, value: '' },
        emailAddress: { hasBeenTouched: false, value: '' },
        lastErrorMessage: '',
        loginStatus: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
            latestMessage: ''
        },
        hasBeenSubmitted: false,
        shouldValidateForm: false
    },
    navigationState: {
        selectedNavigationId: NavigationIds.Home
    },
    installationState: {
        hasLoadedState: false,
        status: {
            hasCompleted: false,
            hasStarted: false,
            latestMessage: '',
            result: null
        }
    }
};
