import { IAction } from './IAction';
import * as Authentication from './AuthenticationActions';

export class AppActions {
    static Load = 'LOAD_APP'
}

export const load = (dispatch: any): IAction => {
    return Authentication.getLoginStatus(dispatch);
}