import * as ApiClient from '../../../api/ApiClient';
import { IFormInputState } from './FormInputState';
import { IAsyncActionState } from './AsyncActionState';

export interface IBuildState {
    newBuildFormState: INewBuildMainForm
    builds: IAsyncActionState<ApiClient.GlobalJsonResultOfIEnumerableOfBuildProperties>
    confirmDeleteDialog: IConfirmDeleteDialog;
}

export interface IBuildSummary {
    id: string,
    name: string,
    buildVersioningType: ApiClient.BuildVersioningType
}

export interface INewBuildMainForm {
    show: boolean,
    name: IFormInputState,
    buildVersioningType: ApiClient.BuildVersioningType,
    shouldValidate: boolean,
    submission: IAsyncActionState<ApiClient.GlobalJsonResultOfNewBuildResult>
}

export interface IConfirmDeleteDialog {
    show: boolean,
    buildId: string,
    submission: IAsyncActionState<ApiClient.GlobalJsonResultOfEmptyResult>
}