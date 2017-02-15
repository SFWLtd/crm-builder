import * as ApiClient from "../../../api/ApiClient";
import { BuildClient } from "../apiclient/BuildClient";
import config from "../Config";
import { IEditBuildProps } from "../presentation/EditBuild";
import { EditBuildFormValidator } from "../validation/EditBuildFormValidator";
import { IAction } from "./IAction";
import * as SolutionActions from "./SolutionActions";

export class BuildActions {
    public static StartFetchingBuilds: string = "START_FETCH_BUILDS";
    public static FinishFetchingBuilds: string = "FINISH_FETCH_BUILDS";
    public static SetBuildVersioningType: string = "SET_BUILD_VERSIONING_TYPE";
    public static SetBuildName: string = "SET_BUILD_NAME";
    public static BlurBuildName: string = "BLUR_BUILD_NAME";
    public static SetBuildMajorVersion: string = "SET_BUILD_MAJOR_VERSION";
    public static BlurBuildMajorVersion: string = "BLUR_BUILD_MAJOR_VERSION";
    public static SetBuildMinorVersion: string = "SET_BUILD_MINOR_VERSION";
    public static BlurBuildMinorVersion: string = "BLUR_BUILD_MINOR_VERSION";
    public static SetSolutionId: string = "SET_SOLUTION_ID";
    public static BlurSolutionId: string = "BLUR_SOLUTION_ID";
    public static SetTargetEnvironmentAuthenticationType: string = "SET_TARGET_ENVIRONMENT_AUTHENTICATION_TYPE";
    public static SetTargetEnvironmentCrmUrl: string = "SET_TARGET_ENVIRONMENT_CRM_URL";
    public static BlurTargetEnvironmentCrmUrl: string = "BLUR_TARGET_ENVIRONMENT_CRM_URL";
    public static SetTargetEnvironmentEmail: string = "SET_TARGET_ENVIRONMENT_EMAIL";
    public static BlurTargetEnvironmentEmail: string = "BLUR_TARGET_ENVIRONMENT_EMAIL";
    public static SetTargetEnvironmentDomain: string = "SET_TARGET_ENVIRONMENT_DOMAIN";
    public static BlurTargetEnvironmentDomain: string = "BLUR_TARGET_ENVIRONMENT_DOMAIN";
    public static SetTargetEnvironmentUsername: string = "SET_TARGET_ENVIRONMENT_USERNAME";
    public static BlurTargetEnvironmentUsername: string = "BLUR_TARGET_ENVIRONMENT_USERNAME";
    public static SetTargetEnvironmentPassword: string = "SET_TARGET_ENVIRONMENT_PASSWORD";
    public static BlurTargetEnvironmentPassword: string = "BLUR_TARGET_ENVIRONMENT_PASSWORD";
    public static ShowNewBuildForm: string = "SHOW_NEW_BUILD_FORM";
    public static CloseBuildForm: string = "CLOSE_NEW_BUILD_FORM";
    public static BeginShowEditBuildForm: string = "BEGIN_SHOW_EDIT_BUILD_FORM";
    public static FinishShowEditBuildForm: string = "FINISH_SHOW_EDIT_BUILD_FORM";
    public static ClearEditableBuild: string = "CLEAR_EDITABLE_BUILD";
    public static ShowDeleteConfirmationDialog: string = "SHOW_DELETE_BUILD_DIALOG";
    public static CloseDeleteConfirmationDialog: string = "CLOSE_DELETE_BUILD_DIALOG";
    public static StartDeletingBuild: string = "START_DELETING_BUILD";
    public static FinishDeletingBuild: string = "FINISH_DELETING_BUILD";
    public static ResetForm: string = "RESET_EDIT_BUILD_FORM";
    public static ValidateForm: string = "VALIDATE_EDIT_BUILD_FORM";
    public static StartSubmittingBuild: string = "START_SUBMIT_BUILD";
    public static FinishSubmittingBuild: string = "FINISH_SUBMIT_BUILD";
}

export const startFetchingBuilds = (dispatch: any): IAction => {

    dispatch(SolutionActions.startGetAllSolutions(dispatch)); // also retrieve available solutions asynchronously

    let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
    client.fetchAll().then((result: ApiClient.GlobalJsonResultOfIEnumerableOfBuildDto) => {
        dispatch(finishFetchingBuilds(result));
    });

    return {
        type: BuildActions.StartFetchingBuilds,
        value: null,
    };
};

export const finishFetchingBuilds = (result: ApiClient.GlobalJsonResultOfIEnumerableOfBuildDto): IAction => {
    return {
        type: BuildActions.FinishFetchingBuilds,
        value: result,
    };
};

export const startBuildSubmit = (props: IEditBuildProps, dispatch: any): IAction => {

    let validator = new EditBuildFormValidator();
    if (!validator.isValid(props)) {
        return {
            type: BuildActions.ValidateForm,
            value: null,
        };
    } else {
        let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));

        if (!props.isEdit) {
            client.addNew(props).then((result: ApiClient.GlobalJsonResultOfBuildDto) => {
                dispatch(finishBuildSubmit(dispatch, result));
            });
        } else {
            client.edit(props).then((result: ApiClient.GlobalJsonResultOfBuildDto) => {
                dispatch(finishBuildSubmit(dispatch, result));
            });
        }
    }

    return {
        type: BuildActions.StartSubmittingBuild,
        value: null,
    };
};

export const finishBuildSubmit = (dispatch: any, result: ApiClient.GlobalJsonResultOfBuildDto): IAction => {

    if (result.successful) {
        dispatch(closeBuildForm(dispatch));
        dispatch(resetForm());
        dispatch(startFetchingBuilds(dispatch));
    }

    return {
        type: BuildActions.FinishSubmittingBuild,
        value: result,
    };
};

export const setBuildName = (name: string): IAction => {
    return {
        type: BuildActions.SetBuildName,
        value: name,
    };
};

export const setBuildVersioningType = (buildVersioningType: ApiClient.BuildVersioningType): IAction => {
    return {
        type: BuildActions.SetBuildVersioningType,
        value: buildVersioningType,
    };
};

export const setBuildMajorVersion = (version: number): IAction => {
    return {
        type: BuildActions.SetBuildMajorVersion,
        value: version,
    };
};

export const setBuildMinorVersion = (version: number): IAction => {
    return {
        type: BuildActions.SetBuildMinorVersion,
        value: version,
    };
};

export const setSolutionId = (solutionId: string): IAction => {
    return {
        type: BuildActions.SetSolutionId,
        value: solutionId,
    };
};

export const setTargetEnvironmentAuthenticationType = (authenticationType: ApiClient.AuthenticationType): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentAuthenticationType,
        value: authenticationType,
    };
};

export const setTargetEnvironmentCrmUrl = (crmUrl: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentCrmUrl,
        value: crmUrl,
    };
};

export const setTargetEnvironmentEmail = (email: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentEmail,
        value: email,
    };
};

export const setTargetEnvironmentDomain = (domain: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentDomain,
        value: domain,
    };
};

export const setTargetEnvironmentUsername = (username: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentUsername,
        value: username,
    };
};

export const setTargetEnvironmentPassword = (password: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentPassword,
        value: password,
    };
};

export const blurBuildName = (): IAction => {
    return {
        type: BuildActions.BlurBuildName,
        value: null,
    };
};

export const blurBuildMajorVersion = (): IAction => {
    return {
        type: BuildActions.BlurBuildMajorVersion,
        value: null,
    };
};

export const blurBuildMinorVersion = (): IAction => {
    return {
        type: BuildActions.BlurBuildMinorVersion,
        value: null,
    };
};

export const blurSolutionId = (): IAction => {
    return {
        type: BuildActions.BlurSolutionId,
        value: null,
    };
};

export const blurTargetEnvironmentCrmUrl = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentCrmUrl,
        value: null,
    };
};

export const blurTargetEnvironmentEmail = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentEmail,
        value: null,
    };
};

export const blurTargetEnvironmentDomain = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentDomain,
        value: null,
    };
};

export const blurTargetEnvironmentUsername = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentUsername,
        value: null,
    };
};

export const BlurTargetEnvironmentPassword = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentPassword,
        value: null,
    };
};

export const showNewBuildForm = (): IAction => {

    return {
        type: BuildActions.ShowNewBuildForm,
        value: null,
    };
};

export const closeBuildForm = (dispatch: any): IAction => {
    dispatch(resetForm());
    dispatch(clearEditableBuild());

    return {
        type: BuildActions.CloseBuildForm,
        value: null,
    };
};

export const beginShowEditBuildForm = (dispatch: any, buildId: string): IAction => {

    let buildClient = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
    buildClient.fetch(buildId).then((result: ApiClient.GlobalJsonResultOfBuildDto) => {
        dispatch(finishShowEditBuildForm(dispatch, result));
    });

    return {
        type: BuildActions.BeginShowEditBuildForm,
        value: null,
    };
};

export const finishShowEditBuildForm = (dispatch: any, editableBuild: ApiClient.GlobalJsonResultOfBuildDto): IAction => {

    if (editableBuild.successful) {
        dispatch(resetForm());
        dispatch(setBuildName(editableBuild.result.name));
        dispatch(setBuildVersioningType(editableBuild.result.buildVersioningType));
        dispatch(setBuildMajorVersion(editableBuild.result.versionMajor));
        dispatch(setBuildMinorVersion(editableBuild.result.versionMinor));
        dispatch(setSolutionId(editableBuild.result.selectedSolutionId));
        dispatch(setTargetEnvironmentAuthenticationType(editableBuild.result.targetAuthenticationType));
        dispatch(setTargetEnvironmentCrmUrl(editableBuild.result.targetCrmUrl));
        dispatch(setTargetEnvironmentEmail(editableBuild.result.targetEmailAddress));
        dispatch(setTargetEnvironmentDomain(editableBuild.result.targetDomain));
        dispatch(setTargetEnvironmentUsername(editableBuild.result.targetUsername));
        dispatch(setTargetEnvironmentPassword(editableBuild.result.targetPassword));
    }

    return {
        type: BuildActions.FinishShowEditBuildForm,
        value: editableBuild,
    };
};

export const clearEditableBuild = (): IAction => {
    return {
        type: BuildActions.ClearEditableBuild,
        value: null,
    };
};

export const resetForm = (): IAction => {
    return {
        type: BuildActions.ResetForm,
        value: null,
    };
};

export const validateForm = (): IAction => {
    return {
        type: BuildActions.ValidateForm,
        value: null,
    };
};

export const showDeleteConfirmationDialog = (buildId: string): IAction => {
    return {
        type: BuildActions.ShowDeleteConfirmationDialog,
        value: buildId,
    };
};

export const closeDeleteConfirmationDialog = (): IAction => {
    return {
        type: BuildActions.CloseDeleteConfirmationDialog,
        value: null,
    };
};

export const startDeletingBuild = (dispatch: any, buildId: string): IAction => {
    let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
    client.delete(buildId).then((result: ApiClient.GlobalJsonResultOfEmptyResult) => {
        dispatch(finishDeletingBuild(dispatch, result));
    });

    return {
        type: BuildActions.StartDeletingBuild,
        value: null,
    };
};

export const finishDeletingBuild = (dispatch: any, result: ApiClient.GlobalJsonResultOfEmptyResult): IAction => {
    if (result.successful) {
        dispatch(closeDeleteConfirmationDialog());
        dispatch(startFetchingBuilds(dispatch));
    }

    return {
        type: BuildActions.FinishDeletingBuild,
        value: null,
    };
};
