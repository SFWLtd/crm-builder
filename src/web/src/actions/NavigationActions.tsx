import { IAction } from './IAction';

export class NavigationActions {
    static SetActiveNavigation = 'SET_ACTIVE_NAVIGATION';
}

export const setActiveNavigation = (activeNavigationId: string): IAction => {

    return {
        type: NavigationActions.SetActiveNavigation,
        value: activeNavigationId
    }
};
