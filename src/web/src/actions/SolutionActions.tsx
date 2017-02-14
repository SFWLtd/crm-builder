import { IAction } from './IAction';
import { SolutionClient } from '../apiclient/SolutionClient';
import * as ApiClient from '../../../api/ApiClient';
import config from '../Config';

export class SolutionActions {
    static StartGetAvailableSolutions: string = 'START_GET_AVAILABLE_SOLUTIONS';
    static FinishGetAvailableSolutions: string = 'FINISH_GET_AVAILABLE_SOLUTIONS';
}

export const startGetAllSolutions = (dispatch: any): IAction => {

    let client = new SolutionClient(new ApiClient.SolutionsClient(config.apiUrl));
    client.getAll()
        .then((result: ApiClient.GlobalJsonResultOfIEnumerableOfSolutionDto) => {
            dispatch(finishGetAvailableSolutions(dispatch, result));
        })

    return {
        type: SolutionActions.StartGetAvailableSolutions,
        value: null
    };
};

export const finishGetAvailableSolutions = (dispatch: any, result: ApiClient.GlobalJsonResultOfIEnumerableOfSolutionDto): IAction => {
    return {
        type: SolutionActions.FinishGetAvailableSolutions,
        value: result
    };
};