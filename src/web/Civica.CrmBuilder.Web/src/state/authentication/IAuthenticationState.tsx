import { IFormInputState } from '../forms/IFormInputState';

export interface IAuthenticationState {
    authenticationType: number,
    crmUrl: IFormInputState;
    emailAddress: IFormInputState;
    domain: IFormInputState;
    username: IFormInputState;
    password: IFormInputState;
    loggedIn: boolean;
    logInAttempts: number;
    lastErrorMessage: string;
}