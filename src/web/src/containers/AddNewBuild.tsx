import { connect } from 'react-redux';
import * as AddNewBuildPresenter from '../presentation/AddNewBuild';
import { NavigationIds } from '../constants/NavigationIds';
import { IAppState } from '../state/AppState';
import * as BuildActions from '../actions/BuildActions';
import * as ApiClient from '../../../api/ApiClient';
import { AddNewBuildFormValidator } from '../validation/AddNewBuildFormValidator';

const mapStateToProps = (state: IAppState): AddNewBuildPresenter.IAddNewBuildProps => {

    let validator = new AddNewBuildFormValidator();

    return {
        shouldDisplay: state.buildState.newBuildFormState.show,
        buildVersioningType: state.buildState.newBuildFormState.buildVersioningType,
        name: state.buildState.newBuildFormState.name.value.toString(),
        nameIsValid: state.buildState.newBuildFormState.shouldValidate && !validator.validateName(state.buildState.newBuildFormState.name.value.toString())
            || state.buildState.newBuildFormState.name.hasBeenTouched && !validator.validateName(state.buildState.newBuildFormState.name.value.toString()),
        versionMajor: state.buildState.newBuildFormState.versionMajor.value as number,
        versionMajorIsValid: state.buildState.newBuildFormState.shouldValidate && !validator.validateVersionMajor(state.buildState.newBuildFormState.versionMajor.value as number)
            || state.buildState.newBuildFormState.versionMajor.hasBeenTouched && !validator.validateVersionMajor(state.buildState.newBuildFormState.versionMajor.value as number),
        versionMinor: state.buildState.newBuildFormState.versionMinor.value as number,
        versionMinorIsValid: state.buildState.newBuildFormState.shouldValidate && !validator.validateVersionMinor(state.buildState.newBuildFormState.versionMinor.value as number)
            || state.buildState.newBuildFormState.versionMinor.hasBeenTouched && !validator.validateVersionMinor(state.buildState.newBuildFormState.versionMinor.value as number),
        isSubmitting: state.buildState.newBuildFormState.submission.hasStarted
    };
};

const mapDispatchToProps = (dispatch: any): AddNewBuildPresenter.IAddNewBuildProps => {
    return {
        buildVersioningTypeOnChange: (buildVersioningType: ApiClient.BuildVersioningType) => dispatch(BuildActions.setBuildVersioningType(buildVersioningType)),
        nameOnBlur: () => dispatch(BuildActions.blurBuildName()),
        nameOnChange: (name: string) => dispatch(BuildActions.setBuildName(name)),
        versionMajorOnBlur: () => dispatch(BuildActions.blurBuildMajorVersion()),
        versionMajorOnChange: (value: number) => dispatch(BuildActions.setBuildMajorVersion(value)),
        versionMinorOnBlur: () => dispatch(BuildActions.blurBuildMinorVersion()),
        versionMinorOnChange: (value: number) => dispatch(BuildActions.setBuildMinorVersion(value)),
        onFormCancel: () => dispatch(BuildActions.closeNewBuildForm()),
        onFormSubmit: (props: AddNewBuildPresenter.IAddNewBuildProps) => dispatch(BuildActions.startNewBuildSubmit(props, dispatch))
    }
};

const AddNewBuild = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewBuildPresenter.AddNewBuild);

export default AddNewBuild;