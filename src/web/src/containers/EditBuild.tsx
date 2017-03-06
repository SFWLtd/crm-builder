import { connect } from "react-redux";
import * as ApiClient from "../../../api/ApiClient";
import * as BuildActions from "../actions/BuildActions";
import { NavigationIds } from "../constants/NavigationIds";
import * as EditBuildPresenter from "../presentation/EditBuild";
import { IAppState } from "../state/AppState";
import { EditBuildFormValidator } from "../validation/EditBuildFormValidator";

const mapStateToProps = (state: IAppState): EditBuildPresenter.IEditBuildProps => {

    let validator = new EditBuildFormValidator();

    return {
        authenticationTypeSelectedValue: state.buildState.editBuildFormState.authenticationType,
        availableSolutions: state.solutionsState.availableSolutions.hasCompleted && state.solutionsState.availableSolutions.result.successful
            ? state.solutionsState.availableSolutions.result.result
            : new Array<ApiClient.Solution>(),
        buildVersioningType: state.buildState.editBuildFormState.buildVersioningType,
        crmUrl: state.buildState.editBuildFormState.crmUrl.value as string,
        crmUrlIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateCrmUrl(state.buildState.editBuildFormState.crmUrl.value as string)
            || state.buildState.editBuildFormState.crmUrl.hasBeenTouched && !validator.validateCrmUrl(state.buildState.editBuildFormState.crmUrl.value as string)),
        domain: state.buildState.editBuildFormState.domain.value as string,
        domainIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateDomain(state.buildState.editBuildFormState.domain.value as string)
            || state.buildState.editBuildFormState.domain.hasBeenTouched && !validator.validateDomain(state.buildState.editBuildFormState.domain.value as string)),
        editBuildId: state.buildState.editBuildFormState.currentBuild != null
            && state.buildState.editBuildFormState.currentBuild.hasCompleted
            && state.buildState.editBuildFormState.currentBuild.result.successful
            ? state.buildState.editBuildFormState.currentBuild.result.result.id
            : null,
        emailAddress: state.buildState.editBuildFormState.emailAddress.value as string,
        emailAddressIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateEmailAddress(state.buildState.editBuildFormState.emailAddress.value as string)
            || state.buildState.editBuildFormState.emailAddress.hasBeenTouched && !validator.validateEmailAddress(state.buildState.editBuildFormState.emailAddress.value as string)),
        isEdit: state.buildState.editBuildFormState.currentBuild != null
            && state.buildState.editBuildFormState.currentBuild.hasCompleted
            && state.buildState.editBuildFormState.currentBuild.result.successful,
        isSubmitting: state.buildState.editBuildFormState.submission.hasStarted,
        name: state.buildState.editBuildFormState.name.value.toString(),
        nameIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateName(state.buildState.editBuildFormState.name.value as string)
            || state.buildState.editBuildFormState.name.hasBeenTouched && !validator.validateName(state.buildState.editBuildFormState.name.value as string)),
        password: state.buildState.editBuildFormState.password.value as string,
        passwordIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validatePassword(state.buildState.editBuildFormState.password.value as string)
            || state.buildState.editBuildFormState.password.hasBeenTouched && !validator.validatePassword(state.buildState.editBuildFormState.password.value as string)),
        selectedSolutionId: state.buildState.editBuildFormState.solutionId.value as string,
        selectedSolutionIdIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateSolutionId(state.buildState.editBuildFormState.solutionId.value as string)
            || state.buildState.editBuildFormState.solutionId.hasBeenTouched && !validator.validateSolutionId(state.buildState.editBuildFormState.solutionId.value as string)),
        shouldDisplay: state.buildState.editBuildFormState.show,
        username: state.buildState.editBuildFormState.username.value as string,
        usernameIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateUsername(state.buildState.editBuildFormState.username.value as string)
            || state.buildState.editBuildFormState.username.hasBeenTouched && !validator.validateUsername(state.buildState.editBuildFormState.username.value as string)),
        versionMajor: state.buildState.editBuildFormState.versionMajor.value as number,
        versionMajorIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateVersionMajor(state.buildState.editBuildFormState.versionMajor.value as number)
            || state.buildState.editBuildFormState.versionMajor.hasBeenTouched && !validator.validateVersionMajor(state.buildState.editBuildFormState.versionMajor.value as number)),
        versionMinor: state.buildState.editBuildFormState.versionMinor.value as number,
        versionMinorIsValid: !(state.buildState.editBuildFormState.shouldValidate && !validator.validateVersionMinor(state.buildState.editBuildFormState.versionMinor.value as number)
            || state.buildState.editBuildFormState.versionMinor.hasBeenTouched && !validator.validateVersionMinor(state.buildState.editBuildFormState.versionMinor.value as number)),
    };
};

const mapDispatchToProps = (dispatch: any): EditBuildPresenter.IEditBuildProps => {
    return {
        authenticationTypeOnChange: (authType: ApiClient.AuthenticationType) => dispatch(BuildActions.setTargetEnvironmentAuthenticationType(authType)),
        buildVersioningTypeOnChange: (buildVersioningType: ApiClient.BuildVersioningType) => dispatch(BuildActions.setBuildVersioningType(buildVersioningType)),
        crmUrlOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentCrmUrl()),
        crmUrlOnChange: (url: string) => dispatch(BuildActions.setTargetEnvironmentCrmUrl(url)),
        domainOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentDomain()),
        domainOnChange: (domain: string) => dispatch(BuildActions.setTargetEnvironmentDomain(domain)),
        emailAddressOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentEmail()),
        emailAddressOnChange: (email: string) => dispatch(BuildActions.setTargetEnvironmentEmail(email)),
        nameOnBlur: () => dispatch(BuildActions.blurBuildName()),
        nameOnChange: (name: string) => dispatch(BuildActions.setBuildName(name)),
        onFormCancel: () => dispatch(BuildActions.closeBuildForm(dispatch)),
        onFormSubmit: (props: EditBuildPresenter.IEditBuildProps) => dispatch(BuildActions.startBuildSubmit(props, dispatch)),
        passwordOnBlur: () => dispatch(BuildActions.BlurTargetEnvironmentPassword()),
        passwordOnChange: (password: string) => dispatch(BuildActions.setTargetEnvironmentPassword(password)),
        selectedSolutionIdOnBlur: () => dispatch(BuildActions.blurSolutionId()),
        selectedSolutionIdOnChange: (solutionId: string) => dispatch(BuildActions.setSolutionId(solutionId)),
        usernameOnBlur: () => dispatch(BuildActions.blurTargetEnvironmentUsername()),
        usernameOnChange: (username: string) => dispatch(BuildActions.setTargetEnvironmentUsername(username)),
        versionMajorOnBlur: () => dispatch(BuildActions.blurBuildMajorVersion()),
        versionMajorOnChange: (value: number) => dispatch(BuildActions.setBuildMajorVersion(value)),
        versionMinorOnBlur: () => dispatch(BuildActions.blurBuildMinorVersion()),
        versionMinorOnChange: (value: number) => dispatch(BuildActions.setBuildMinorVersion(value)),
    };
};

const AddNewBuild = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditBuildPresenter.EditBuild);

export default AddNewBuild;
