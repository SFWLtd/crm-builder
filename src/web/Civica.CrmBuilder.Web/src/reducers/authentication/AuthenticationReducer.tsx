﻿import { combineReducers } from 'redux';
import { IAuthenticationState } from '../../state/authentication/IAuthenticationState';
import { IAction } from '../../actions/IAction';
import { AuthenticationActions } from '../../actions/authentication/AuthenticationActions';

const authenticationReducer = (state: IAuthenticationState, action: IAction): IAuthenticationState => {

    let newState = state;

    switch (action.type) {
        case AuthenticationActions.SetAuthenticationType:
            newState.authenticationType = action.value;
            break;
        case AuthenticationActions.SetCrmUrl:
            newState.crmUrl.value = action.value;
            break;
        case AuthenticationActions.SetDomain:
            newState.domain.value = action.value;
            break;
        case AuthenticationActions.SetUsername:
            newState.username.value = action.value;
            break;
        case AuthenticationActions.SetEmailAddress:
            newState.emailAddress.value = action.value;
            break;
        case AuthenticationActions.SetPassword:
            newState.password.value = action.value;
            break;
        case AuthenticationActions.BlurCrmUrl:
            newState.crmUrl.hasBeenTouched = true;
            break;
        case AuthenticationActions.BlurEmailAddress:
            newState.emailAddress.hasBeenTouched = true;
            break;
        case AuthenticationActions.BlurDomain:
            newState.domain.hasBeenTouched = true;
            break;
        case AuthenticationActions.BlurUsername:
            newState.username.hasBeenTouched = true;
            break;
        case AuthenticationActions.BlurPassword:
            newState.password.hasBeenTouched = true;
            break;
        case AuthenticationActions.ResetFormFields:
            newState.crmUrl.value = '';
            newState.crmUrl.hasBeenTouched = false;
            newState.emailAddress.value = '';
            newState.emailAddress.hasBeenTouched = false;
            newState.domain.value = '';
            newState.domain.hasBeenTouched = false;
            newState.username.value = '';
            newState.username.hasBeenTouched = false;
            newState.password.value = '';
            newState.password.hasBeenTouched = false;
            newState.logInAttempts = 0;
            break;

        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
}

export default authenticationReducer;
