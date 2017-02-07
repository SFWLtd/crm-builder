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
        isSubmitting: state.buildState.newBuildFormState.submission.hasStarted
    };
};

const mapDispatchToProps = (dispatch: any): AddNewBuildPresenter.IAddNewBuildProps => {
    return {
        buildVersioningTypeOnChange: (buildVersioningType: ApiClient.BuildVersioningType) => dispatch(BuildActions.setBuildVersioningType(buildVersioningType)),
        nameOnBlur: () => dispatch(BuildActions.blurBuildName()),
        nameOnChange: (name: string) => dispatch(BuildActions.setBuildName(name)),
        onFormCancel: () => dispatch(BuildActions.closeNewBuildForm()),
        onFormSubmit: (props: AddNewBuildPresenter.IAddNewBuildProps) => dispatch(BuildActions.startNewBuildSubmit(props, dispatch))
    }
};

const AddNewBuild = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewBuildPresenter.AddNewBuild);

export default AddNewBuild;