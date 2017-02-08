import { connect } from 'react-redux';
import * as EditBuildPresenter from '../presentation/EditBuild';
import { NavigationIds } from '../constants/NavigationIds';
import { IAppState } from '../state/AppState';
import * as BuildActions from '../actions/BuildActions';
import * as ApiClient from '../../../api/ApiClient';
import { EditBuildFormValidator } from '../validation/EditBuildFormValidator';

const mapStateToProps = (state: IAppState): EditBuildPresenter.IEditBuildProps => {

    let validator = new EditBuildFormValidator();

    return {
        shouldDisplay: state.buildState.editBuildFormState.show,
        buildVersioningType: state.buildState.editBuildFormState.buildVersioningType,
        name: state.buildState.editBuildFormState.name.value.toString(),
        nameIsValid: state.buildState.editBuildFormState.shouldValidate && !validator.validateName(state.buildState.editBuildFormState.name.value.toString())
            || state.buildState.editBuildFormState.name.hasBeenTouched && !validator.validateName(state.buildState.editBuildFormState.name.value.toString()),
        versionMajor: state.buildState.editBuildFormState.versionMajor.value as number,
        versionMajorIsValid: state.buildState.editBuildFormState.shouldValidate && !validator.validateVersionMajor(state.buildState.editBuildFormState.versionMajor.value as number)
            || state.buildState.editBuildFormState.versionMajor.hasBeenTouched && !validator.validateVersionMajor(state.buildState.editBuildFormState.versionMajor.value as number),
        versionMinor: state.buildState.editBuildFormState.versionMinor.value as number,
        versionMinorIsValid: state.buildState.editBuildFormState.shouldValidate && !validator.validateVersionMinor(state.buildState.editBuildFormState.versionMinor.value as number)
            || state.buildState.editBuildFormState.versionMinor.hasBeenTouched && !validator.validateVersionMinor(state.buildState.editBuildFormState.versionMinor.value as number),
        isSubmitting: state.buildState.editBuildFormState.submission.hasStarted,
        isEdit: state.buildState.editBuildFormState.currentBuild != null 
            && state.buildState.editBuildFormState.currentBuild.hasCompleted
            && state.buildState.editBuildFormState.currentBuild.result.successful,
        editBuildId: state.buildState.editBuildFormState.currentBuild != null 
            && state.buildState.editBuildFormState.currentBuild.hasCompleted
            && state.buildState.editBuildFormState.currentBuild.result.successful
            ? state.buildState.editBuildFormState.currentBuild.result.result.id
            : null
    };
};

const mapDispatchToProps = (dispatch: any): EditBuildPresenter.IEditBuildProps => {
    return {
        buildVersioningTypeOnChange: (buildVersioningType: ApiClient.BuildVersioningType) => dispatch(BuildActions.setBuildVersioningType(buildVersioningType)),
        nameOnBlur: () => dispatch(BuildActions.blurBuildName()),
        nameOnChange: (name: string) => dispatch(BuildActions.setBuildName(name)),
        versionMajorOnBlur: () => dispatch(BuildActions.blurBuildMajorVersion()),
        versionMajorOnChange: (value: number) => dispatch(BuildActions.setBuildMajorVersion(value)),
        versionMinorOnBlur: () => dispatch(BuildActions.blurBuildMinorVersion()),
        versionMinorOnChange: (value: number) => dispatch(BuildActions.setBuildMinorVersion(value)),
        onFormCancel: () => dispatch(BuildActions.closeBuildForm(dispatch)),
        onFormSubmit: (props: EditBuildPresenter.IEditBuildProps) => dispatch(BuildActions.startBuildSubmit(props, dispatch)),
    }
};

const AddNewBuild = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditBuildPresenter.EditBuild);

export default AddNewBuild;