import { IAuthenticationState } from './authentication/IAuthenticationState';
import { INavigationState } from './navigation/INavigationState';
import { NavigationIds } from '../constants/NavigationIds';
import * as ApiClient from '../../../../api/ApiClient';

export interface IAppState {
    authenticationState: IAuthenticationState;
    navigationState: INavigationState;
}

export const defaultAppState: IAppState = {
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
        loggedIn: false,
        shouldValidateForm: false
    },
    navigationState: {
        selectedNavigationId: NavigationIds.Home
    }
};
