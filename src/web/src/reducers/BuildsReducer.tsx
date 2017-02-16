import * as ApiClient from "../../../api/ApiClient";
import { BuildActions } from "../actions/BuildActions";
import { IAction } from "../actions/IAction";
import { IBuildState } from "../state/BuildState";

const buildReducer = (state: IBuildState, action: IAction): IBuildState => {

    let newState = state;

    switch (action.type) {
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
            newState.editBuildFormState.name.value = action.value;
            break;
        case BuildActions.SetBuildVersioningType:
            newState.editBuildFormState.buildVersioningType = action.value;
            break;
        case BuildActions.SetBuildMajorVersion:
            newState.editBuildFormState.versionMajor.value = action.value;
            break;
        case BuildActions.SetBuildMinorVersion:
            newState.editBuildFormState.versionMinor.value = action.value;
            break;
        case BuildActions.BlurBuildName:
            newState.editBuildFormState.name.hasBeenTouched = true;
            break;
        case BuildActions.BlurBuildMajorVersion:
            newState.editBuildFormState.versionMajor.hasBeenTouched = true;
            break;
        case BuildActions.BlurBuildMinorVersion:
            newState.editBuildFormState.versionMajor.hasBeenTouched = true;
            break;
        case BuildActions.SetSolutionId:
            newState.editBuildFormState.solutionId.value = action.value;
            break;
        case BuildActions.BlurSolutionId:
            newState.editBuildFormState.solutionId.hasBeenTouched = true;
            break;
        case BuildActions.SetTargetEnvironmentAuthenticationType:
            newState.editBuildFormState.authenticationType = action.value;
            break;
        case BuildActions.SetTargetEnvironmentCrmUrl:
            newState.editBuildFormState.crmUrl.value = action.value;
            break;
        case BuildActions.BlurTargetEnvironmentCrmUrl:
            newState.editBuildFormState.crmUrl.hasBeenTouched = true;
            break;
        case BuildActions.SetTargetEnvironmentDomain:
            newState.editBuildFormState.domain.value = action.value;
            break;
        case BuildActions.BlurTargetEnvironmentDomain:
            newState.editBuildFormState.domain.hasBeenTouched = true;
            break;
        case BuildActions.SetTargetEnvironmentEmail:
            newState.editBuildFormState.emailAddress.value = action.value;
            break;
        case BuildActions.BlurTargetEnvironmentEmail:
            newState.editBuildFormState.emailAddress.hasBeenTouched = true;
            break;
        case BuildActions.SetTargetEnvironmentUsername:
            newState.editBuildFormState.username.value = action.value;
            break;
        case BuildActions.BlurTargetEnvironmentUsername:
            newState.editBuildFormState.emailAddress.hasBeenTouched = true;
            break;
        case BuildActions.SetTargetEnvironmentPassword:
            newState.editBuildFormState.password.value = action.value;
            break;
        case BuildActions.BlurTargetEnvironmentPassword:
            newState.editBuildFormState.password.hasBeenTouched = true;
            break;
        case BuildActions.ShowNewBuildForm:
            newState.editBuildFormState.show = true;
            break;
        case BuildActions.CloseBuildForm:
            newState.editBuildFormState.show = false;
            break;
        case BuildActions.BeginShowEditBuildForm:
            newState.editBuildFormState.currentBuild.hasStarted = true;
            newState.editBuildFormState.currentBuild.hasCompleted = false;
            newState.editBuildFormState.currentBuild.result = null;
            break;
        case BuildActions.FinishShowEditBuildForm:
            newState.editBuildFormState.show = true;
            newState.editBuildFormState.currentBuild.hasStarted = false;
            newState.editBuildFormState.currentBuild.hasCompleted = true;
            newState.editBuildFormState.currentBuild.result = action.value;
            break;
        case BuildActions.ClearEditableBuild:
            newState.editBuildFormState.currentBuild.result = null;
            newState.editBuildFormState.currentBuild.hasStarted = false;
            newState.editBuildFormState.currentBuild.hasCompleted = false;
            break;
        case BuildActions.ValidateForm:
            newState.editBuildFormState.shouldValidate = true;
            break;
        case BuildActions.ResetForm:
            newState.editBuildFormState.name.value = "";
            newState.editBuildFormState.buildVersioningType = ApiClient.BuildVersioningType.JulianDate;
            newState.editBuildFormState.name.hasBeenTouched = false;
            newState.editBuildFormState.versionMajor.value = 0;
            newState.editBuildFormState.versionMajor.hasBeenTouched = false;
            newState.editBuildFormState.versionMinor.value = 0;
            newState.editBuildFormState.versionMinor.hasBeenTouched = false;
            newState.editBuildFormState.solutionId.value = "";
            newState.editBuildFormState.solutionId.hasBeenTouched = false;
            newState.editBuildFormState.authenticationType = ApiClient.AuthenticationType.Dynamics365;
            newState.editBuildFormState.crmUrl.value = "";
            newState.editBuildFormState.crmUrl.hasBeenTouched = false;
            newState.editBuildFormState.emailAddress.value = "";
            newState.editBuildFormState.emailAddress.hasBeenTouched = false;
            newState.editBuildFormState.username.value = "";
            newState.editBuildFormState.username.hasBeenTouched = false;
            newState.editBuildFormState.domain.value = "";
            newState.editBuildFormState.domain.hasBeenTouched = false;
            newState.editBuildFormState.password.value = "";
            newState.editBuildFormState.password.hasBeenTouched = false;
            newState.editBuildFormState.submission.hasStarted = false;
            newState.editBuildFormState.submission.hasCompleted = false;
            newState.editBuildFormState.submission.result = null;
            newState.editBuildFormState.shouldValidate = false;
            break;
        case BuildActions.StartSubmittingBuild:
            newState.editBuildFormState.submission.hasStarted = true;
            newState.editBuildFormState.submission.hasCompleted = false;
            newState.editBuildFormState.submission.result = null;
            break;
        case BuildActions.FinishSubmittingBuild:
            newState.editBuildFormState.submission.hasStarted = false;
            newState.editBuildFormState.submission.hasCompleted = true;
            newState.editBuildFormState.submission.result = action.value;
            break;
        case BuildActions.ShowDeleteConfirmationDialog:
            newState.confirmDeleteDialog.show = true;
            newState.confirmDeleteDialog.buildId = action.value;
            break;
        case BuildActions.CloseDeleteConfirmationDialog:
            newState.confirmDeleteDialog.show = false;
            newState.confirmDeleteDialog.buildId = "";
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
