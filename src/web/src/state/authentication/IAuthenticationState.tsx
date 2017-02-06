import { IFormInputState } from '../forms/IFormInputState';
import { IAsyncActionState } from '../async/IAsyncActionState';
import * as ApiClient from '../../../../api/ApiClient';

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
    loginStatus: IAsyncActionState<ApiClient.GlobalJsonResultOfSessionTokenResult>;
    logOutStatus: IAsyncActionState<ApiClient.GlobalJsonResultOfEmptyResult>;
}
