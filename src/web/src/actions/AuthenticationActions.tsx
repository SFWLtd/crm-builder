import * as ApiClient from "../../../api/ApiClient";
import { AuthenticationClient } from "../apiclient/AuthenticationClient";
import config from "../Config";
import { IAuthenticationFormProps } from "../presentation/AuthenticationForm";
import { IAppState } from "../state/AppState";
import { AuthenticationFormValidator } from "../validation/AuthenticationFormValidator";
import { IAction } from "./IAction";

export class AuthenticationActions {
    public static BlurCrmUrl: string = "BLUR_CRM_URL";
    public static BlurEmailAddress: string = "BLUR_EMAIL_ADDRESS";
    public static BlurUsername: string = "BLUR_USERNAME";
    public static BlurDomain: string = "BLUR_DOMAIN";
    public static BlurPassword: string = "BLUR_PASSWORD";
    public static SetAuthenticationType: string = "SET_AUTHENTICATION_TYPE";
    public static SetCrmUrl: string = "SET_CRM_URL";
    public static SetEmailAddress: string = "SET_EMAIL_ADDRESS";
    public static SetUsername: string = "SET_USERNAME";
    public static SetDomain: string = "SET_DOMAIN";
    public static SetPassword: string = "SET_PASSWORD";
    public static ResetFormFields: string = "RESET_FORM_FIELDS";
    public static Submit: string = "SUBMIT_AUTHENTICATION_FORM";
    public static GetLoginStatus: string = "GET_LOGIN_STATUS";
    public static SetLoginAuthenticationState: string = "SET_LOGIN_AUTHENTICATION_STATE";
    public static SetAuthenticationState: string = "SET_AUTHENTICATION_STATE";
    public static ValidateForm: string = "VALIDATE_AUTHENTICATION_FORM";
    public static BeginLogOut: string = "BEGIN_LOG_OUT";
    public static FinishLogOut: string = "FINISH_LOG_OUT";
}

export const setCrmUrl = (url: string): IAction => {
    return {
        type: AuthenticationActions.SetCrmUrl,
        value: url,
    };
};

export const setEmailAddress = (emailAddress: string): IAction => {
    return {
        type: AuthenticationActions.SetEmailAddress,
        value: emailAddress,
    };
};

export const setAuthenticationType = (authenticationType: number): IAction => {
    return {
        type: AuthenticationActions.SetAuthenticationType,
        value: authenticationType,
    };
};

export const setUsername = (username: string): IAction => {
    return {
        type: AuthenticationActions.SetUsername,
        value: username,
    };
};

export const setDomain = (domain: string): IAction => {
    return {
        type: AuthenticationActions.SetDomain,
        value: domain,
    };
};

export const setPassword = (password: string): IAction => {
    return {
        type: AuthenticationActions.SetPassword,
        value: password,
    };
};

export const blurCrmUrl = (): IAction => {
    return {
        type: AuthenticationActions.BlurCrmUrl,
        value: null,
    };
};

export const blurCrmEmailAddress = (): IAction => {
    return {
        type: AuthenticationActions.BlurEmailAddress,
        value: null,
    };
};

export const blurDomain = (): IAction => {
    return {
        type: AuthenticationActions.BlurDomain,
        value: null,
    };
};

export const blurUsername = (): IAction => {
    return {
        type: AuthenticationActions.BlurUsername,
        value: null,
    };
};

export const blurPassword = (): IAction => {
    return {
        type: AuthenticationActions.BlurPassword,
        value: null,
    };
};

export const resetFormFields = (): IAction => {
    return {
        type: AuthenticationActions.ResetFormFields,
        value: null,
    };
};

export const submit = (dispatch: any, props: IAuthenticationFormProps): IAction => {

    let validator = new AuthenticationFormValidator();

    if (!validator.isValid(props)) {
        return {
            type: AuthenticationActions.ValidateForm,
            value: null,
        };
    }

    let authenticationClient = new AuthenticationClient(new ApiClient.SessionClient(config.apiUrl));
    let newSessionResult = authenticationClient.newSession(props);
    newSessionResult
        .then((result: ApiClient.GlobalJsonResultOfBoolean) => {
            let setAuthAction: IAction = setLoginAuthenticationResult(dispatch, result);
            dispatch(setAuthAction);
        });

    return {
        type: AuthenticationActions.Submit,
        value: null,
    };
};

export const getLoginStatus = (dispatch: any): IAction => {

    let authenticationClient = new AuthenticationClient(new ApiClient.SessionClient(config.apiUrl));
    let getSessionResult = authenticationClient.checkSessionExists();
    getSessionResult
        .then((result: ApiClient.GlobalJsonResultOfBoolean) => {
            let setAuthAction: IAction = setAuthenticationResult(dispatch, result);
            dispatch(setAuthAction);
        });

    return {
        type: AuthenticationActions.GetLoginStatus,
        value: null,
    };
};

export const setLoginAuthenticationResult = (dispatch: any, result: ApiClient.GlobalJsonResultOfBoolean): IAction => {

    return {
        type: AuthenticationActions.SetLoginAuthenticationState,
        value: result,
    };
};

export const setAuthenticationResult = (dispatch: any, result: ApiClient.GlobalJsonResultOfBoolean): IAction => {

    return {
        type: AuthenticationActions.SetAuthenticationState,
        value: result,
    };
};

export const beginLogOut = (dispatch: any): IAction => {

    let authenticationClient = new AuthenticationClient(new ApiClient.SessionClient(config.apiUrl));
    authenticationClient.endSession()
        .then((result: ApiClient.GlobalJsonResultOfEmptyResult) => {
            dispatch(finishLogOut(dispatch));
        });

    return {
        type: AuthenticationActions.BeginLogOut,
        value: null,
    };
};

export const finishLogOut = (dispatch: any): IAction => {
    dispatch(getLoginStatus(dispatch));

    return {
        type: AuthenticationActions.FinishLogOut,
        value: null,
    };
};
