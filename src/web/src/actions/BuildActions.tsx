import * as ApiClient from '../../../api/ApiClient';
import { IAction } from './IAction';
import { EditBuildFormValidator } from '../validation/EditBuildFormValidator';
import { IEditBuildProps } from '../presentation/EditBuild';
import config from '../Config';
import { BuildClient } from '../apiclient/BuildClient';

export class BuildActions {
    static StartFetchingBuilds: string = 'START_FETCH_BUILDS';
    static FinishFetchingBuilds: string = 'FINISH_FETCH_BUILDS';
    static SetBuildVersioningType: string = 'SET_BUILD_VERSIONING_TYPE';
    static SetBuildName: string = 'SET_BUILD_NAME';
    static BlurBuildName: string = 'BLUR_BUILD_NAME';
    static SetBuildMajorVersion: string = 'SET_BUILD_MAJOR_VERSION';
    static BlurBuildMajorVersion: string = 'BLUR_BUILD_MAJOR_VERSION';
    static SetBuildMinorVersion: string = 'SET_BUILD_MINOR_VERSION';
    static BlurBuildMinorVersion: string = 'BLUR_BUILD_MINOR_VERSION';
    static SetTargetEnvironmentAuthenticationType: string = 'SET_TARGET_ENVIRONMENT_AUTHENTICATION_TYPE';
    static SetTargetEnvironmentCrmUrl: string = 'SET_TARGET_ENVIRONMENT_CRM_URL';
    static BlurTargetEnvironmentCrmUrl: string = 'BLUR_TARGET_ENVIRONMENT_CRM_URL';
    static SetTargetEnvironmentEmail: string = 'SET_TARGET_ENVIRONMENT_EMAIL';
    static BlurTargetEnvironmentEmail: string = 'BLUR_TARGET_ENVIRONMENT_EMAIL';
    static SetTargetEnvironmentDomain: string = 'SET_TARGET_ENVIRONMENT_DOMAIN';
    static BlurTargetEnvironmentDomain: string = 'BLUR_TARGET_ENVIRONMENT_DOMAIN';
    static SetTargetEnvironmentUsername: string = 'SET_TARGET_ENVIRONMENT_USERNAME';
    static BlurTargetEnvironmentUsername: string = 'BLUR_TARGET_ENVIRONMENT_USERNAME';
    static SetTargetEnvironmentPassword: string = 'SET_TARGET_ENVIRONMENT_PASSWORD';
    static BlurTargetEnvironmentPassword: string = 'BLUR_TARGET_ENVIRONMENT_PASSWORD';
    static ShowNewBuildForm: string = 'SHOW_NEW_BUILD_FORM';
    static CloseBuildForm: string = 'CLOSE_NEW_BUILD_FORM';
    static BeginShowEditBuildForm: string = 'BEGIN_SHOW_EDIT_BUILD_FORM';
    static FinishShowEditBuildForm: string = 'FINISH_SHOW_EDIT_BUILD_FORM';
    static ClearEditableBuild: string = 'CLEAR_EDITABLE_BUILD';
    static ShowDeleteConfirmationDialog: string = 'SHOW_DELETE_BUILD_DIALOG';
    static CloseDeleteConfirmationDialog: string = 'CLOSE_DELETE_BUILD_DIALOG';
    static StartDeletingBuild: string = 'START_DELETING_BUILD';
    static FinishDeletingBuild: string = 'FINISH_DELETING_BUILD';
    static ResetForm: string = 'RESET_EDIT_BUILD_FORM';
    static ValidateForm: string = 'VALIDATE_EDIT_BUILD_FORM';
    static StartSubmittingBuild: string = 'START_SUBMIT_BUILD';
    static FinishSubmittingBuild: string = 'FINISH_SUBMIT_BUILD';
}

export const startFetchingBuilds = (dispatch: any): IAction => {

    let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
    client.fetchAll().then((result: ApiClient.GlobalJsonResultOfIEnumerableOfBuildDto) => {
        dispatch(finishFetchingBuilds(result));
    });

    return {
        type: BuildActions.StartFetchingBuilds,
        value: null
    };
};

export const finishFetchingBuilds = (result: ApiClient.GlobalJsonResultOfIEnumerableOfBuildDto): IAction => {
    return {
        type: BuildActions.FinishFetchingBuilds,
        value: result
    }
}

export const startBuildSubmit = (props: IEditBuildProps, dispatch: any): IAction => {

    let validator = new EditBuildFormValidator();  
    if (!validator.isValid(props)) {
        return {
            type: BuildActions.ValidateForm,
            value: null
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
        value: null
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
        value: result
    };
};

export const setBuildName = (name: string): IAction => {
    return {
        type: BuildActions.SetBuildName,
        value: name
    };
};

export const setBuildVersioningType = (buildVersioningType: ApiClient.BuildVersioningType): IAction => {
    return {
        type: BuildActions.SetBuildVersioningType,
        value: buildVersioningType
    };
};

export const setBuildMajorVersion = (version: number): IAction => {
    return {
        type: BuildActions.SetBuildMajorVersion,
        value: version
    };
};

export const setBuildMinorVersion = (version: number): IAction => {
    return {
        type: BuildActions.SetBuildMinorVersion,
        value: version
    };
};

export const setTargetEnvironmentAuthenticationType = (authenticationType: ApiClient.AuthenticationType): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentAuthenticationType,
        value: authenticationType
    };
};

export const setTargetEnvironmentCrmUrl = (crmUrl: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentCrmUrl,
        value: crmUrl
    };
};

export const setTargetEnvironmentEmail = (email: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentEmail,
        value: email
    };
};

export const setTargetEnvironmentDomain = (domain: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentDomain,
        value: domain
    };
};

export const setTargetEnvironmentUsername = (username: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentUsername,
        value: username
    };
};

export const setTargetEnvironmentPassword = (password: string): IAction => {
    return {
        type: BuildActions.SetTargetEnvironmentPassword,
        value: password
    };
};

export const blurBuildName = (): IAction => {
    return {
        type: BuildActions.BlurBuildName,
        value: null
    };
};

export const blurBuildMajorVersion = (): IAction => {
    return {
        type: BuildActions.BlurBuildMajorVersion,
        value: null
    };
};

export const blurBuildMinorVersion = (): IAction => {
    return {
        type: BuildActions.BlurBuildMinorVersion,
        value: null
    };
};

export const blurTargetEnvironmentCrmUrl = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentCrmUrl,
        value: null
    };
};

export const blurTargetEnvironmentEmail = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentEmail,
        value: null
    };
};

export const blurTargetEnvironmentDomain = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentDomain,
        value: null
    };
};

export const blurTargetEnvironmentUsername = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentUsername,
        value: null
    };
};

export const BlurTargetEnvironmentPassword = (): IAction => {
    return {
        type: BuildActions.BlurTargetEnvironmentPassword,
        value: null
    };
};

export const showNewBuildForm = (): IAction => {

    return {
        type: BuildActions.ShowNewBuildForm,
        value: null
    };
};

export const closeBuildForm = (dispatch: any): IAction => {
    dispatch(resetForm());
    dispatch(clearEditableBuild());

    return {
        type: BuildActions.CloseBuildForm,
        value: null
    };
};

export const beginShowEditBuildForm = (dispatch: any, buildId: string): IAction => {
    
    let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
    client.fetch(buildId).then((result: ApiClient.GlobalJsonResultOfBuildDto) => {
        dispatch(finishShowEditBuildForm(dispatch, result));
    });

    return {
        type: BuildActions.BeginShowEditBuildForm,
        value: null
    };
};

export const finishShowEditBuildForm = (dispatch: any, editableBuild: ApiClient.GlobalJsonResultOfBuildDto): IAction => {

    if (editableBuild.successful) {
        dispatch(resetForm());
        dispatch(setBuildName(editableBuild.result.name));
        dispatch(setBuildVersioningType(editableBuild.result.buildVersioningType));
        dispatch(setBuildMajorVersion(editableBuild.result.versionMajor));
        dispatch(setBuildMinorVersion(editableBuild.result.versionMinor));
        dispatch(setTargetEnvironmentAuthenticationType(editableBuild.result.targetAuthenticationType));
        dispatch(setTargetEnvironmentCrmUrl(editableBuild.result.targetCrmUrl));
        dispatch(setTargetEnvironmentEmail(editableBuild.result.targetEmailAddress));
        dispatch(setTargetEnvironmentDomain(editableBuild.result.targetDomain));
        dispatch(setTargetEnvironmentUsername(editableBuild.result.targetUsername));
        dispatch(setTargetEnvironmentPassword(editableBuild.result.targetPassword));
    }

    return {
        type: BuildActions.FinishShowEditBuildForm,
        value: editableBuild
    };
};

export const clearEditableBuild = (): IAction => {
    return {
        type: BuildActions.ClearEditableBuild,
        value: null
    };
};

export const resetForm = (): IAction => {
    return {
        type: BuildActions.ResetForm,
        value: null
    };
};

export const validateForm = (): IAction => {
    return {
        type: BuildActions.ValidateForm,
        value: null
    };
};

export const showDeleteConfirmationDialog = (buildId: string): IAction => {
    return {
        type: BuildActions.ShowDeleteConfirmationDialog,
        value: buildId
    };
};

export const closeDeleteConfirmationDialog = (): IAction => {
    return {
        type: BuildActions.CloseDeleteConfirmationDialog,
        value: null
    };
};

export const startDeletingBuild = (dispatch: any, buildId: string): IAction => {
    let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
    client.delete(buildId).then((result: ApiClient.GlobalJsonResultOfEmptyResult) => {
        dispatch(finishDeletingBuild(dispatch, result));
    })

    return {
        type: BuildActions.StartDeletingBuild,
        value: null
    };
};

export const finishDeletingBuild = (dispatch: any, result: ApiClient.GlobalJsonResultOfEmptyResult): IAction => {
    if (result.successful) {
        dispatch(closeDeleteConfirmationDialog());
        dispatch(startFetchingBuilds(dispatch));
    }

    return {
        type: BuildActions.FinishDeletingBuild,
        value: null
    };
};