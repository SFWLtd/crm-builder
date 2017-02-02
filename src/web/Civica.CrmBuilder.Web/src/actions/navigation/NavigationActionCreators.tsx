import { IAction } from '../IAction';
import { NavigationActions } from './NavigationActions';

export const setActiveNavigation = (activeNavigationId: string): IAction => {

    return {
        type: NavigationActions.SetActiveNavigation,
        value: activeNavigationId
    }
};
