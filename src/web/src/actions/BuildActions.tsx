import * as ApiClient from '../../../api/ApiClient';
import { IAction } from './IAction';
import { AddNewBuildFormValidator } from '../validation/AddNewBuildFormValidator';
import { IAddNewBuildProps } from '../presentation/AddNewBuild';
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
    static ShowNewBuildForm: string = 'SHOW_NEW_BUILD_FORM';
    static CloseNewBuildForm: string = 'CLOSE_NEW_BUILD_FORM';
    static ShowDeleteConfirmationDialog: string = 'SHOW_DELETE_BUILD_DIALOG';
    static CloseDeleteConfirmationDialog: string = 'CLOSE_DELETE_BUILD_DIALOG';
    static StartDeletingBuild: string = 'START_DELETING_BUILD';
    static FinishDeletingBuild: string = 'FINISH_DELETING_BUILD';
    static ResetForm: string = 'RESET_NEW_BUILD_FORM';
    static ValidateForm: string = 'VALIDATE_NEW_BUILD_FORM';
    static StartSubmittingNewBuild: string = 'START_SUBMIT_NEW_BUILD';
    static FinishSubmittingNewBuild: string = 'FINISH_SUBMIT_NEW_BUILD';
}

export const startFetchingBuilds = (dispatch: any): IAction => {

    let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
    client.fetchAll().then((result: ApiClient.GlobalJsonResultOfIEnumerableOfBuildProperties) => {
        dispatch(finishFetchingBuilds(result));
    });

    return {
        type: BuildActions.StartFetchingBuilds,
        value: null
    };
};

export const finishFetchingBuilds = (result: ApiClient.GlobalJsonResultOfIEnumerableOfBuildProperties): IAction => {
    return {
        type: BuildActions.FinishFetchingBuilds,
        value: result
    }
}

export const startNewBuildSubmit = (props: IAddNewBuildProps, dispatch: any): IAction => {

    let validator = new AddNewBuildFormValidator();  
    if (!validator.isValid(props)) {
        return {
            type: BuildActions.ValidateForm,
            value: null
        };
    } else {
        let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
        client.addNew(props).then((result: ApiClient.GlobalJsonResultOfNewBuildResult) => {
            dispatch(finishNewBuildSubmit(dispatch, result));
        });
    }

    return {
        type: BuildActions.StartSubmittingNewBuild,
        value: null
    };
};

export const finishNewBuildSubmit = (dispatch: any, result: ApiClient.GlobalJsonResultOfNewBuildResult): IAction => {

    if (result.successful) {
        dispatch(closeNewBuildForm());
        dispatch(resetForm());
        dispatch(startFetchingBuilds(dispatch));
    }

    return {
        type: BuildActions.FinishSubmittingNewBuild,
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

export const showNewBuildForm = (): IAction => {

    return {
        type: BuildActions.ShowNewBuildForm,
        value: null
    };
};

export const closeNewBuildForm = (): IAction => {
    return {
        type: BuildActions.CloseNewBuildForm,
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