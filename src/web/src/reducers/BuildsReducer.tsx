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
            newState.formState.name.value = action.value;
            break;
        case BuildActions.SetBuildVersioningType:
            newState.formState.buildVersioningType = action.value;
            break;
        case BuildActions.BlurBuildName:
            newState.formState.name.hasBeenTouched = true;
            break;
        case BuildActions.ShowForm:
            newState.formState.show = true;
            break;
        case BuildActions.CloseForm:
            newState.formState.show = false;
            break;
        case BuildActions.ValidateForm:
            newState.formState.shouldValidate = true;
            break;
        case BuildActions.ResetForm:
            newState.formState.name.value = '';
            newState.formState.buildVersioningType = ApiClient.BuildVersioningType.JulianDate;
            newState.formState.name.hasBeenTouched = false;
            newState.formState.submission.hasStarted = false;
            newState.formState.submission.hasCompleted = false;
            newState.formState.submission.result = null;
            newState.formState.shouldValidate = false;
            break;
        case BuildActions.StartSubmittingNewBuild:
            newState.formState.submission.hasStarted = true,
            newState.formState.submission.hasCompleted = false,
            newState.formState.submission.result = null
            break;
        case BuildActions.FinishSubmittingNewBuild:
            newState.formState.submission.hasStarted = false,
            newState.formState.submission.hasCompleted = true,
            newState.formState.submission.result = action.value
            break;

        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};  

export default buildReducer;