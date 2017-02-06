import { LoadingActions } from './LoadingActions';
import { IAction } from '../IAction';

export const SetLoadingTitle = (title: string): IAction => {
    return {
        type: LoadingActions.SetLoadingTitle,
        value: title
    }
}

export const SetLoadingDescription = (description: string): IAction => {
    return {
        type: LoadingActions.SetLoadingDescription,
        value: description
    }
}

export const StopLoading = (): IAction => {
    return {
        type: LoadingActions.StopLoading,
        value: null
    }
}