import * as AppState from '../../state/loading/ILoadingState';
import { IAction } from '../../actions/IAction';
import { LoadingActions } from '../../actions/loading/LoadingActions';

const loadingReducer = (state: AppState.ILoadingState, action: IAction): AppState.ILoadingState => {
    let newState = state;

    switch (action.type) {
        case LoadingActions.SetLoadingTitle:
            newState.isLoading = true;
            newState.title = action.value;
            break;
        case LoadingActions.SetLoadingDescription:
            newState.isLoading = true;
            newState.description = action.value;
            break;
        case LoadingActions.StopLoading:
            newState.isLoading = false;
            newState.description = '';
            newState.title = '';
            break;

        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
}

export default loadingReducer;