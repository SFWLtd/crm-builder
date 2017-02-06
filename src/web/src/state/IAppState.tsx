import { IAuthenticationState } from './authentication/IAuthenticationState';
import { INavigationState } from './navigation/INavigationState';
import { NavigationIds } from '../constants/NavigationIds';
import * as ApiClient from '../../../api/ApiClient';
import { IAsyncActionState } from './async/IAsyncActionState';
import { IInstallationState } from './installation/IInstallationState';
import { ILoadingState } from './loading/ILoadingState';

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
        },
        hasBeenSubmitted: false,
        shouldValidateForm: false
    },
    navigationState: {
        selectedNavigationId: NavigationIds.Builds
    },
    installationState: {
        hasLoadedState: false,
        status: {
            hasCompleted: false,
            hasStarted: false,
            result: null
        },
        installation: {
            hasCompleted: false,
            hasStarted: false,
            result: null
        },
        description: null,
        message: null
    }
};
