import * as ApiClient from '../../../api/ApiClient';
import { IFormInputState } from './FormInputState';
import { IAsyncActionState } from './AsyncActionState';

export interface IBuildState {
    formState: INewBuildMainForm
    builds: IAsyncActionState<ApiClient.GlobalJsonResultOfIEnumerableOfBuildProperties>
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