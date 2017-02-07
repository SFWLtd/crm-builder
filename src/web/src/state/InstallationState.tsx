import * as ApiClient from '../../../api/ApiClient';
import { IAsyncActionState } from './AsyncActionState';

export interface IInstallationState {
    hasLoadedState: boolean;
    status: IAsyncActionState<ApiClient.GlobalJsonResultOfInstallationStatusResult>;
    installation: IAsyncActionState<ApiClient.GlobalJsonResultOfInstallationResult>;
    message: string;
    description: string;
}