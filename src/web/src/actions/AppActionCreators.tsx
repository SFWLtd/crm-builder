import { IAction } from './IAction';
import { AppActions } from './AppActions';
import * as AuthenticationActionCreators from './authentication/AuthenticationActionCreators';

export const load = (dispatch: any): IAction => {
    return AuthenticationActionCreators.getLoginStatus(dispatch);
}