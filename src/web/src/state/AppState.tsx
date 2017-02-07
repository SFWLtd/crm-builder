import { IAuthenticationState } from './AuthenticationState';
import { INavigationState } from './NavigationState';
import { NavigationIds } from '../constants/NavigationIds';
import * as ApiClient from '../../../api/ApiClient';
import { IAsyncActionState } from './AsyncActionState';
import { IInstallationState } from './InstallationState';
import { IBuildState, IBuildSummary } from './BuildState';
import { ILoadingState } from './LoadingState';

export interface IAppState {
    authenticationState: IAuthenticationState;
    navigationState: INavigationState;
    installationState: IInstallationState;
    buildState: IBuildState;
}

export const defaultAppState: IAppState = {
    authenticationState: {
        authenticationType: ApiClient.AuthenticationType.Dynamics365,
        crmUrl: { hasBeenTouched: false, value: '' },
        domain: { hasBeenTouched: false, value: '' },
        username: { hasBeenTouched: false, value: '' },
        password: { hasBeenTouched: false, value: '' },
        emailAddress: { hasBeenTouched: false, value: '' },
        lastErrorMessage: '',
        loginStatus: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
        },
        hasBeenSubmitted: false,
        shouldValidateForm: false,
        logOutStatus: {
            hasCompleted: false,
            hasStarted: false,
            result: null
        }
    },
    navigationState: {
        selectedNavigationId: NavigationIds.Builds
    },
    installationState: {
        hasLoadedState: false,
        status: {
            hasCompleted: false,
            hasStarted: false,
            result: null
        },
        installation: {
            hasCompleted: false,
            hasStarted: false,
            result: null
        },
        description: null,
        message: null
    },
    buildState: {
        builds: {
            hasCompleted: false,
            hasStarted: false,
            result: null
        },
        formState: {
            buildVersioningType: ApiClient.BuildVersioningType.JulianDate,
            name: {
                hasBeenTouched: false,
                value: ''
            },
            shouldValidate: false,
            show: false,
            submission: {
                hasCompleted: false,
                hasStarted: false,
                result: null
            }
        }
    }
};
