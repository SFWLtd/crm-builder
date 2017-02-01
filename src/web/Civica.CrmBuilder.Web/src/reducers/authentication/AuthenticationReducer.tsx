import { combineReducers } from 'redux';
import { IAuthenticationState } from '../../state/authentication/IAuthenticationState';
import { IAction } from '../../actions/IAction';
import { AuthenticationActions } from '../../actions/authentication/AuthenticationActions';

const authenticationReducer = (state: IAuthenticationState, action: IAction): IAuthenticationState => {

    let newState = state;

    switch (action.type) {
        case AuthenticationActions.SetCrmUrl:
            newState.crmUrl.value = action.value;
            break;
        case AuthenticationActions.SetEmailAddress:
            newState.emailAddress.value = action.value;
            break;
        case AuthenticationActions.BlurCrmUrl:
            newState.crmUrl.hasBeenTouched = true;
            break;
        case AuthenticationActions.BlurEmailAddress:
            newState.emailAddress.hasBeenTouched = true;
            break;
        case AuthenticationActions.SetAuthenticationType:
            newState.authenticationType = action.value;

        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
}

export default authenticationReducer;
