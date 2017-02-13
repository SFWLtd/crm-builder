import * as ApiClient from '../../../api/ApiClient';
import { IFormInputState } from './FormInputState';
import { IAsyncActionState } from './AsyncActionState';

export interface IBuildState {
    editBuildFormState: IEditBuildFormState
    builds: IAsyncActionState<ApiClient.GlobalJsonResultOfIEnumerableOfBuildDto>
    confirmDeleteDialog: IConfirmDeleteDialog;
}

export interface IBuildSummary {
    id: string,
    name: string,
    buildVersioningType: ApiClient.BuildVersioningType
}

export interface IEditBuildFormState {
    currentBuild: IAsyncActionState<ApiClient.GlobalJsonResultOfBuildDto>
    show: boolean,
    name: IFormInputState,
    buildVersioningType: ApiClient.BuildVersioningType,
    versionMajor: IFormInputState,
    versionMinor: IFormInputState,
    authenticationType: ApiClient.AuthenticationType,
    crmUrl: IFormInputState,
    domain: IFormInputState,
    username: IFormInputState,
    password: IFormInputState,
    emailAddress: IFormInputState,
    shouldValidate: boolean,
    submission: IAsyncActionState<ApiClient.GlobalJsonResultOfBuildDto>
}

export interface IConfirmDeleteDialog {
    show: boolean,
    buildId: string,
    submission: IAsyncActionState<ApiClient.GlobalJsonResultOfEmptyResult>
}