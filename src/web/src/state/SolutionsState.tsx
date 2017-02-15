import * as ApiClient from "../../../api/ApiClient";
import { IAsyncActionState } from "./AsyncActionState";

export interface ISolutionsState {
    availableSolutions: IAsyncActionState<ApiClient.GlobalJsonResultOfIEnumerableOfSolutionDto>;
}
