import * as Authentication from "./AuthenticationActions";
import { IAction } from "./IAction";

export class AppActions {
    public static Load = "LOAD_APP";
}

export const load = (dispatch: any): IAction => {
    return Authentication.getLoginStatus(dispatch);
};
