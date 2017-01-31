import { combineReducers } from 'redux';
import { IAuthenticationState } from '../../state/authentication/IAuthenticationState';
import { IAction } from '../../actions/IAction';
import { AuthenticationActions } from '../../actions/authentication/AuthenticationActions';

const defaultState: IAuthenticationState = {
    crmUrl: '',
    emailAddress: '',
    loggedIn: false,
    logInAttempts: 0,
    lastErrorMessage: ''
}

const authenticationReducer = (state: IAuthenticationState = defaultState, action: IAction): IAuthenticationState => {

    let newState = state;

    switch (action.type) {
        case AuthenticationActions.SetCrmUrl:
            newState.crmUrl = action.value;
            break;
        case AuthenticationActions.SetEmailAddress:
            newState.emailAddress = action.value;
            break;

        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
}

export default authenticationReducer;
