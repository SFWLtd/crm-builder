import { IAction } from '../IAction';
import { AuthenticationActions } from './AuthenticationActions';

export const setCrmUrl = (url: string): IAction => {
    return {
        type: AuthenticationActions.SetCrmUrl,
        value: url
    };
}

export const setEmailAddress = (emailAddress: string): IAction => {
    return {
        type: AuthenticationActions.SetEmailAddress,
        value: emailAddress
    };
}

export const blurCrmUrl = (): IAction => {
    return {
        type: AuthenticationActions.BlurCrmUrl,
        value: null
    }
}

export const blurCrmEmailAddress = (): IAction => {
    return {
        type: AuthenticationActions.BlurEmailAddress,
        value: null
    }
}
