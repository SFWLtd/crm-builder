import { combineReducers } from 'redux';
import { INavigationState } from '../../state/navigation/INavigationState';
import { IAction } from '../../actions/IAction';
import { NavigationActions } from '../../actions/navigation/NavigationActions';

const navigationReducer = (state: INavigationState, action: IAction): INavigationState => {

    let newState = state;

    switch (action.type) {
        case NavigationActions.SetActiveNavigation:
            newState.selectedNavigationId = action.value;
            break;

        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
}

export default navigationReducer;
