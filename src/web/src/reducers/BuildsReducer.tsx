import { IAction } from '../actions/IAction';
import { BuildActions } from '../actions/BuildActions';
import { IBuildState } from '../state/BuildState';
import * as ApiClient from '../../../api/ApiClient';

const buildReducer = (state: IBuildState, action: IAction): IBuildState => {

    let newState = state;

    switch (action.type)
    {
        case BuildActions.StartFetchingBuilds:
            newState.builds.hasStarted = true;
            newState.builds.hasCompleted = false;
            newState.builds.result = null;
            break;
        case BuildActions.FinishFetchingBuilds:
            newState.builds.hasStarted = false;
            newState.builds.hasCompleted = true;
            newState.builds.result = action.value;
            break;
        case BuildActions.SetBuildName:
            newState.newBuildFormState.name.value = action.value;
            break;
        case BuildActions.SetBuildVersioningType:
            newState.newBuildFormState.buildVersioningType = action.value;
            break;
        case BuildActions.SetBuildMajorVersion:
            newState.newBuildFormState.versionMajor.value = action.value;
            break;
        case BuildActions.SetBuildMinorVersion:
            newState.newBuildFormState.versionMinor.value = action.value;
            break;
        case BuildActions.BlurBuildName:
            newState.newBuildFormState.name.hasBeenTouched = true;
            break;
        case BuildActions.BlurBuildMajorVersion:
            newState.newBuildFormState.versionMajor.hasBeenTouched = true;
            break;
        case BuildActions.BlurBuildMinorVersion:
            newState.newBuildFormState.versionMajor.hasBeenTouched = true;
            break;
        case BuildActions.ShowNewBuildForm:
            newState.newBuildFormState.show = true;
            break;
        case BuildActions.CloseNewBuildForm:
            newState.newBuildFormState.show = false;
            break;
        case BuildActions.ValidateForm:
            newState.newBuildFormState.shouldValidate = true;
            break;
        case BuildActions.ResetForm:
            newState.newBuildFormState.name.value = '';
            newState.newBuildFormState.buildVersioningType = ApiClient.BuildVersioningType.JulianDate;
            newState.newBuildFormState.name.hasBeenTouched = false;
            newState.newBuildFormState.versionMajor.value = 0;
            newState.newBuildFormState.versionMajor.hasBeenTouched = false;
            newState.newBuildFormState.versionMinor.value = 0;
            newState.newBuildFormState.versionMinor.hasBeenTouched = false;
            newState.newBuildFormState.submission.hasStarted = false;
            newState.newBuildFormState.submission.hasCompleted = false;
            newState.newBuildFormState.submission.result = null;
            newState.newBuildFormState.shouldValidate = false;
            break;
        case BuildActions.StartSubmittingNewBuild:
            newState.newBuildFormState.submission.hasStarted = true;
            newState.newBuildFormState.submission.hasCompleted = false;
            newState.newBuildFormState.submission.result = null;
            break;
        case BuildActions.FinishSubmittingNewBuild:
            newState.newBuildFormState.submission.hasStarted = false;
            newState.newBuildFormState.submission.hasCompleted = true;
            newState.newBuildFormState.submission.result = action.value;
            break;
        case BuildActions.ShowDeleteConfirmationDialog:
            newState.confirmDeleteDialog.show = true;
            newState.confirmDeleteDialog.buildId = action.value;
            break;
        case BuildActions.CloseDeleteConfirmationDialog:
            newState.confirmDeleteDialog.show = false;
            newState.confirmDeleteDialog.buildId = '';
            break;
        case BuildActions.StartDeletingBuild: 
            newState.confirmDeleteDialog.submission.hasStarted = true;
            newState.confirmDeleteDialog.submission.hasCompleted = false;
            newState.confirmDeleteDialog.submission.result = null;
            break;
        case BuildActions.FinishDeletingBuild:
            newState.confirmDeleteDialog.submission.hasStarted = false;
            newState.confirmDeleteDialog.submission.hasCompleted = true;
            newState.confirmDeleteDialog.submission.result = null;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};  

export default buildReducer;