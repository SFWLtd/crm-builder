import * as ApiClient from "../../../api/ApiClient";
import { IAsyncActionState } from "./AsyncActionState";
import { IFormInputState } from "./FormInputState";

export interface IAuthenticationState {
    authenticationType: number;
    crmUrl: IFormInputState;
    emailAddress: IFormInputState;
    domain: IFormInputState;
    username: IFormInputState;
    password: IFormInputState;
    shouldValidateForm: boolean;
    lastErrorMessage: string;
    hasBeenSubmitted: boolean;
    loginStatus: IAsyncActionState<ApiClient.GlobalJsonResultOfBoolean>;
    logOutStatus: IAsyncActionState<ApiClient.GlobalJsonResultOfEmptyResult>;
}
