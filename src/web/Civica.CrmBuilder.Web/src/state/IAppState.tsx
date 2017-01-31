import { IAuthenticationState } from './authentication/IAuthenticationState';
import { INavigationState } from './navigation/INavigationState';
import { NavigationIds } from '../constants/NavigationIds';

export interface IAppState {
    authenticationState: IAuthenticationState;
    navigationState: INavigationState;
}

export const defaultAppState: IAppState = {
    authenticationState: {
        crmUrl: '',
        emailAddress: '',
        lastErrorMessage: '',
        loggedIn: false,
        logInAttempts: 0
    },
    navigationState: {
        selectedNavigationId: NavigationIds.Home 
    }
};