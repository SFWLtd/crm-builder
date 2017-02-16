import { combineReducers } from "redux";
import { IAction } from "../actions/IAction";
import { NavigationActions } from "../actions/NavigationActions";
import { INavigationState } from "../state/NavigationState";

const navigationReducer = (state: INavigationState, action: IAction): INavigationState => {

    let newState = state;

    switch (action.type) {
        case NavigationActions.SetActiveNavigation:
            newState.selectedNavigationId = action.value;
            break;

        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};

export default navigationReducer;
