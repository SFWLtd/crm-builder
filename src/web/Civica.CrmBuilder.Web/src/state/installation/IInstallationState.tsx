import * as ApiClient from '../../../../../api/ApiClient';
import { IAsyncActionState } from '../async/IAsyncActionState';

export interface IInstallationState {
    hasLoadedState: boolean;
    status: IAsyncActionState<ApiClient.GlobalJsonResultOfInstallationStatusResult>
}