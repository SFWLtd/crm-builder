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
        loggedIn: false,
        logInAttempts: 0
    },
    navigationState: {
        selectedNavigationId: NavigationIds.Home 
    }
};