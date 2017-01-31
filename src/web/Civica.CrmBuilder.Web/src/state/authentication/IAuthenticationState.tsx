export interface IAuthenticationState {
    crmUrl: string;
    emailAddress: string;
    loggedIn: boolean;
    logInAttempts: number;
    lastErrorMessage: string;
}