import { IAuthenticationState } from './authentication/IAuthenticationState';

export interface IAppState {
    authenticationState: IAuthenticationState;
}

export const defaultAppState: IAppState = {
    authenticationState: {
        crmUrl: '',
        emailAddress: '',
        lastErrorMessage: '',
        loggedIn: false,
        logInAttempts: 0
    }
};