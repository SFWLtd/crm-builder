import { IAction } from './IAction';
import { AuthenticationClient } from '../apiclient/AuthenticationClient';
import { IAppState } from '../state/AppState';
import { IAuthenticationFormProps } from '../presentation/AuthenticationForm';
import { AuthenticationFormValidator } from '../validation/AuthenticationFormValidator';
import * as ApiClient from '../../../api/ApiClient';
import config from '../Config';

export class AuthenticationActions {
    static BlurCrmUrl: string = 'BLUR_CRM_URL';
    static BlurEmailAddress: string = 'BLUR_EMAIL_ADDRESS';
    static BlurUsername: string = 'BLUR_USERNAME';
    static BlurDomain: string = 'BLUR_DOMAIN';
    static BlurPassword: string = 'BLUR_PASSWORD';
    static SetAuthenticationType: string = 'SET_AUTHENTICATION_TYPE';
    static SetCrmUrl: string = 'SET_CRM_URL';
    static SetEmailAddress: string = 'SET_EMAIL_ADDRESS';
    static SetUsername: string = 'SET_USERNAME';
    static SetDomain: string = 'SET_DOMAIN';
    static SetPassword: string = 'SET_PASSWORD';
    static ResetFormFields: string = 'RESET_FORM_FIELDS';
    static Submit: string = 'SUBMIT_AUTHENTICATION_FORM';
    static GetLoginStatus: string = 'GET_LOGIN_STATUS';
    static SetLoginAuthenticationState: string = 'SET_LOGIN_AUTHENTICATION_STATE';
    static SetAuthenticationState: string = 'SET_AUTHENTICATION_STATE';
    static ValidateForm: string = 'VALIDATE_AUTHENTICATION_FORM';
    static BeginLogOut: string = 'BEGIN_LOG_OUT';
    static FinishLogOut: string = 'FINISH_LOG_OUT';
}

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

export const submit = (dispatch: any, props: IAuthenticationFormProps): IAction => {

    let validator = new AuthenticationFormValidator();
    
    if (!validator.IsValid(props)) {
        return {
            type: AuthenticationActions.ValidateForm,
            value: null
        };
    }

    let authenticationClient = new AuthenticationClient(new ApiClient.SessionClient(config.apiUrl));
    let newSessionResult = authenticationClient.newSession(props);
    newSessionResult
        .then((result: ApiClient.GlobalJsonResultOfSessionTokenResult) => {
            let setAuthAction: IAction = setLoginAuthenticationResult(dispatch, result);
            dispatch(setAuthAction);
        });

    return {
        type: AuthenticationActions.Submit,
        value: null
    };
};

export const getLoginStatus = (dispatch: any): IAction => {

    let authenticationClient = new AuthenticationClient(new ApiClient.SessionClient(config.apiUrl));
    let getSessionResult = authenticationClient.getSession();
    getSessionResult
        .then((result: ApiClient.GlobalJsonResultOfSessionTokenResult) => {
            let setAuthAction: IAction = setAuthenticationResult(dispatch, result);
            dispatch(setAuthAction);
        });

    return {
        type: AuthenticationActions.GetLoginStatus,
        value: null
    }
}

export const setLoginAuthenticationResult = (dispatch: any, result: ApiClient.GlobalJsonResultOfSessionTokenResult): IAction => {

    return {
        type: AuthenticationActions.SetLoginAuthenticationState,
        value: result
    };
};

export const setAuthenticationResult = (dispatch: any, result: ApiClient.GlobalJsonResultOfSessionTokenResult): IAction => {

    return {
        type: AuthenticationActions.SetAuthenticationState,
        value: result
    };
};

export const beginLogOut = (dispatch: any): IAction => {

    let authenticationClient = new AuthenticationClient(new ApiClient.SessionClient(config.apiUrl));
    authenticationClient.endSession()
        .then((result: ApiClient.GlobalJsonResultOfEmptyResult) => {
            dispatch(finishLogOut(dispatch));
        })

    return {
        type: AuthenticationActions.BeginLogOut,
        value: null
    };
}

export const finishLogOut = (dispatch: any): IAction => {
    dispatch(getLoginStatus(dispatch));

    return {
        type: AuthenticationActions.FinishLogOut,
        value: null
    };
}
