import { IAction } from '../IAction';
import { AuthenticationActions } from './AuthenticationActions';
import { AuthenticationClient } from '../../apiclient/authentication/AuthenticationClient';
import { IAppState } from '../../state/IAppState';
import { IAuthenticationFormProps } from '../../presentation/authentication/AuthenticationForm';
import { AuthenticationFormValidator } from '../../validation/authentication/AuthenticationFormValidator';
import * as ApiClient from '../../../../../api/ApiClient';
import config from '../../Config';

export const setCrmUrl = (url: string): IAction => {
    return {
        type: AuthenticationActions.SetCrmUrl,
        value: url
    };
};

export const setEmailAddress = (emailAddress: string): IAction => {
    return {
        type: AuthenticationActions.SetEmailAddress,
        value: emailAddress
    };
};

export const setAuthenticationType = (authenticationType: number): IAction => {
    return {
        type: AuthenticationActions.SetAuthenticationType,
        value: authenticationType
    };
};

export const setUsername = (username: string): IAction => {
    return {
        type: AuthenticationActions.SetUsername,
        value: username
    };
};

export const setDomain = (domain: string): IAction => {
    return {
        type: AuthenticationActions.SetDomain,
        value: domain
    };
};

export const setPassword = (password: string): IAction => {
    return {
        type: AuthenticationActions.SetPassword,
        value: password
    };
};

export const blurCrmUrl = (): IAction => {
    return {
        type: AuthenticationActions.BlurCrmUrl,
        value: null
    };
};

export const blurCrmEmailAddress = (): IAction => {
    return {
        type: AuthenticationActions.BlurEmailAddress,
        value: null
    };
};

export const blurDomain = (): IAction => {
    return {
        type: AuthenticationActions.BlurDomain,
        value: null
    };
};

export const blurUsername = (): IAction => {
    return {
        type: AuthenticationActions.BlurUsername,
        value: null
    };
};

export const blurPassword = (): IAction => {
    return {
        type: AuthenticationActions.BlurPassword,
        value: null
    };
};

export const resetFormFields = (): IAction => {
    return {
        type: AuthenticationActions.ResetFormFields,
        value: null
    };
};

export const submit = (dispatch: any, props: IAuthenticationFormProps, initialMessage: string): IAction => {

    let validator = new AuthenticationFormValidator();
    
    if (!validator.IsValid(props)) {
        return {
            type: AuthenticationActions.ValidateForm,
            value: null
        };
    }

    let authenticationClient = new AuthenticationClient(props, new ApiClient.SessionClient(config.apiUrl));
    let newSessionResult = authenticationClient.newSession();
    newSessionResult
        .then((result: ApiClient.GlobalJsonResultOfSessionTokenResult) => {
            let setAuthAction: IAction = setAuthenticationResult(result);
            dispatch(setAuthAction);
        });

    return {
        type: AuthenticationActions.Submit,
        value: initialMessage
    };
};

export const setAuthenticationResult = (result: ApiClient.GlobalJsonResultOfSessionTokenResult): IAction => {
    return {
        type: AuthenticationActions.SetAuthenticationState,
        value: result
    };
};

