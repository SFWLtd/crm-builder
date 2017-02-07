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
    static ShowForm: string = 'SHOW_NEW_BUILD_FORM';
    static CloseForm: string = 'CLOSE_NEW_BUILD_FORM';
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

export const startSubmit = (props: IAddNewBuildProps, dispatch: any): IAction => {

    let validator = new AddNewBuildFormValidator();  
    if (!validator.isValid(props)) {
        return {
            type: BuildActions.ValidateForm,
            value: null
        };
    } else {
        let client = new BuildClient(new ApiClient.BuildsClient(config.apiUrl));
        client.addNew(props).then((result: ApiClient.GlobalJsonResultOfNewBuildResult) => {
            dispatch(finishSubmit(dispatch, result));
        });
    }

    return {
        type: BuildActions.StartSubmittingNewBuild,
        value: null
    };
};

export const finishSubmit = (dispatch: any, result: ApiClient.GlobalJsonResultOfNewBuildResult): IAction => {

    if (result.successful) {
        dispatch(closeNewBuildForm());
        dispatch(resetForm());
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

export const blurBuildName = (): IAction => {
    return {
        type: BuildActions.BlurBuildName,
        value: null
    };
};

export const showNewBuildForm = (): IAction => {

    return {
        type: BuildActions.ShowForm,
        value: null
    };
};

export const closeNewBuildForm = (): IAction => {
    return {
        type: BuildActions.CloseForm,
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