import * as ApiClient from "../../../api/ApiClient";
import { SolutionClient } from "../apiclient/SolutionClient";
import config from "../Config";
import { IAction } from "./IAction";

export class SolutionActions {
    public static StartGetAvailableSolutions: string = "START_GET_AVAILABLE_SOLUTIONS";
    public static FinishGetAvailableSolutions: string = "FINISH_GET_AVAILABLE_SOLUTIONS";
}

export const startGetAllSolutions = (dispatch: any): IAction => {

    let client = new SolutionClient(new ApiClient.SolutionsClient(config.apiUrl));
    client.getAll()
        .then((result: ApiClient.GlobalJsonResultOfIEnumerableOfSolutionDto) => {
            dispatch(finishGetAvailableSolutions(dispatch, result));
        });

    return {
        type: SolutionActions.StartGetAvailableSolutions,
        value: null,
    };
};

export const finishGetAvailableSolutions = (dispatch: any, result: ApiClient.GlobalJsonResultOfIEnumerableOfSolutionDto): IAction => {
    return {
        type: SolutionActions.FinishGetAvailableSolutions,
        value: result,
    };
};
