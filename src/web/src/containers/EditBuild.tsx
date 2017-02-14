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
        nameIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateName(state.buildState.editBuildFormState.name.value as string)
            || state.buildState.editBuildFormState.name.hasBeenTouched && !validator.validateName(state.buildState.editBuildFormState.name.value as string)),
        versionMajor: state.buildState.editBuildFormState.versionMajor.value as number,
        versionMajorIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateVersionMajor(state.buildState.editBuildFormState.versionMajor.value as number)
            || state.buildState.editBuildFormState.versionMajor.hasBeenTouched && !validator.validateVersionMajor(state.buildState.editBuildFormState.versionMajor.value as number)),
        versionMinor: state.buildState.editBuildFormState.versionMinor.value as number,
        versionMinorIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateVersionMinor(state.buildState.editBuildFormState.versionMinor.value as number)
            || state.buildState.editBuildFormState.versionMinor.hasBeenTouched && !validator.validateVersionMinor(state.buildState.editBuildFormState.versionMinor.value as number)),
        selectedSolutionId: state.buildState.editBuildFormState.solutionId.value as string,
        availableSolutions: state.solutionsState.availableSolutions.hasCompleted && state.solutionsState.availableSolutions.result.successful
            ? state.solutionsState.availableSolutions.result.result
            : new Array<ApiClient.SolutionDto>(),
        selectedSolutionIdIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateSolutionId(state.buildState.editBuildFormState.solutionId.value as string)
            || state.buildState.editBuildFormState.solutionId.hasBeenTouched && !validator.validateSolutionId(state.buildState.editBuildFormState.solutionId.value as string)),
        authenticationTypeSelectedValue: state.buildState.editBuildFormState.authenticationType,
        crmUrl: state.buildState.editBuildFormState.crmUrl.value as string,
        crmUrlIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateCrmUrl(state.buildState.editBuildFormState.crmUrl.value as string)
            || state.buildState.editBuildFormState.crmUrl.hasBeenTouched && !validator.validateCrmUrl(state.buildState.editBuildFormState.crmUrl.value as string)),
        emailAddress: state.buildState.editBuildFormState.emailAddress.value as string,
        emailAddressIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateEmailAddress(state.buildState.editBuildFormState.emailAddress.value as string)
            || state.buildState.editBuildFormState.emailAddress.hasBeenTouched && !validator.validateEmailAddress(state.buildState.editBuildFormState.emailAddress.value as string)),
        username: state.buildState.editBuildFormState.username.value as string,
        usernameIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateUsername(state.buildState.editBuildFormState.username.value as string)
            || state.buildState.editBuildFormState.username.hasBeenTouched && !validator.validateUsername(state.buildState.editBuildFormState.username.value as string)),
        domain: state.buildState.editBuildFormState.domain.value as string,
        domainIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateDomain(state.buildState.editBuildFormState.domain.value as string)
            || state.buildState.editBuildFormState.domain.hasBeenTouched && !validator.validateDomain(state.buildState.editBuildFormState.domain.value as string)),
        password: state.buildState.editBuildFormState.password.value as string,
        passwordIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validatePassword(state.buildState.editBuildFormState.password.value as string)
            || state.buildState.editBuildFormState.password.hasBeenTouched && !validator.validatePassword(state.buildState.editBuildFormState.password.value as string)),
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
        selectedSolutionIdOnChange: (solutionId: string) => dispatch(BuildActions.setSolutionId(solutionId)),
        selectedSolutionIdOnBlur: () => dispatch(BuildActions.blurSolutionId()),
        authenticationTypeOnChange: (authType: ApiClient.AuthenticationType) => dispatch(BuildActions.setTargetEnvironmentAuthenticationType(authType)),
        crmUrlOnChange: (url: string) => dispatch(BuildActions.setTargetEnvironmentCrmUrl(url)),
        crmUrlOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentCrmUrl()),
        emailAddressOnChange: (email: string) => dispatch(BuildActions.setTargetEnvironmentEmail(email)),
        emailAddressOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentEmail()),
        domainOnChange: (domain: string) => dispatch(BuildActions.setTargetEnvironmentDomain(domain)),
        domainOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentDomain()),
        usernameOnChange: (username: string) => dispatch(BuildActions.setTargetEnvironmentUsername(username)),
        usernameOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentUsername()),
        passwordOnChange: (password: string) => dispatch(BuildActions.setTargetEnvironmentPassword(password)),
        passwordOnBlur: () => dispatch(BuildActions.BlurTargetEnvironmentPassword()),
        onFormCancel: () => dispatch(BuildActions.closeBuildForm(dispatch)),
        onFormSubmit: (props: EditBuildPresenter.IEditBuildProps) => dispatch(BuildActions.startBuildSubmit(props, dispatch)),
    }
};

const AddNewBuild = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditBuildPresenter.EditBuild);

export default AddNewBuild;