import { IFormInputState } from '../forms/IFormInputState';

export interface IAuthenticationState {
    authenticationType: number,
    crmUrl: IFormInputState;
    emailAddress: IFormInputState;
    loggedIn: boolean;
    logInAttempts: number;
    lastErrorMessage: string;
}