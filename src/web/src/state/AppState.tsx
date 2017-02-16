import * as ApiClient from "../../../api/ApiClient";
import { NavigationIds } from "../constants/NavigationIds";
import { IAsyncActionState } from "./AsyncActionState";
import { IAuthenticationState } from "./AuthenticationState";
import { IBuildState, IBuildSummary } from "./BuildState";
import { IInstallationState } from "./InstallationState";
import { ILoadingState } from "./LoadingState";
import { INavigationState } from "./NavigationState";
import { ISolutionsState } from "./SolutionsState";

export interface IAppState {
    authenticationState: IAuthenticationState;
    navigationState: INavigationState;
    installationState: IInstallationState;
    solutionsState: ISolutionsState;
    buildState: IBuildState;
}

export const defaultAppState: IAppState = {
    authenticationState: {
        authenticationType: ApiClient.AuthenticationType.Dynamics365,
        crmUrl: { hasBeenTouched: false, value: "" },
        domain: { hasBeenTouched: false, value: "" },
        emailAddress: { hasBeenTouched: false, value: "" },
        hasBeenSubmitted: false,
        lastErrorMessage: "",
        logOutStatus: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
        },
        loginStatus: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
        },
        password: { hasBeenTouched: false, value: "" },
        shouldValidateForm: false,
        username: { hasBeenTouched: false, value: "" },
    },
    buildState: {
        builds: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
        },
        confirmDeleteDialog: {
            buildId: "",
            show: false,
            submission: {
                hasCompleted: false,
                hasStarted: false,
                result: null,
            },
        },
        editBuildFormState: {
            authenticationType: ApiClient.AuthenticationType.Dynamics365,
            buildVersioningType: ApiClient.BuildVersioningType.JulianDate,
            crmUrl: { hasBeenTouched: false, value: "" },
            currentBuild: {
                hasCompleted: false,
                hasStarted: false,
                result: null,
            },
            domain: { hasBeenTouched: false, value: "" },
            emailAddress: { hasBeenTouched: false, value: "" },
            name: {
                hasBeenTouched: false,
                value: "",
            },
            password: { hasBeenTouched: false, value: "" },
            shouldValidate: false,
            show: false,
            solutionId: { hasBeenTouched: false, value: ""},
            submission: {
                hasCompleted: false,
                hasStarted: false,
                result: null,
            },
            username: { hasBeenTouched: false, value: "" },
            versionMajor: {
                hasBeenTouched: false,
                value: 0,
            },
            versionMinor: {
                hasBeenTouched: false,
                value: 0,
            },
        },
    },
    installationState: {
        description: null,
        hasLoadedState: false,
        installation: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
        },
        message: null,
        status: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
        },
    },
    navigationState: {
        selectedNavigationId: NavigationIds.Builds,
    },
    solutionsState: {
        availableSolutions: {
            hasCompleted: false,
            hasStarted: false,
            result: null,
        },
    },
};
