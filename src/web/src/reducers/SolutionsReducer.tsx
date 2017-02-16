import * as ApiClient from "../../../api/ApiClient";
import { IAction } from "../actions/IAction";
import { SolutionActions } from "../actions/SolutionActions";
import { ISolutionsState } from "../state/SolutionsState";

const solutionsReducer = (state: ISolutionsState, action: IAction): ISolutionsState => {

    let newState = state;

    switch (action.type) {
        case SolutionActions.StartGetAvailableSolutions:
            newState.availableSolutions.hasStarted = true;
            newState.availableSolutions.hasCompleted = false;
            newState.availableSolutions.result = null;
            break;
        case SolutionActions.FinishGetAvailableSolutions:
            newState.availableSolutions.hasCompleted = true;
            newState.availableSolutions.hasStarted = false;
            newState.availableSolutions.result = action.value;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};

export default solutionsReducer;
