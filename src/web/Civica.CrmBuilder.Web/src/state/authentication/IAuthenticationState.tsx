﻿import { IFormInputState } from '../forms/IFormInputState';

export interface IAuthenticationState {
    crmUrl: IFormInputState;
    emailAddress: IFormInputState;
    loggedIn: boolean;
    logInAttempts: number;
    lastErrorMessage: string;
}