import { connect } from "react-redux";
import * as AuthenticationActionCreators from "../actions/AuthenticationActions";
import * as AuthenticationFormPresenter from "../presentation/AuthenticationForm";
import { IAppState } from "../state/AppState";
import { AuthenticationFormValidator } from "../validation/AuthenticationFormValidator";

const mapStateToProps = (state: IAppState): AuthenticationFormPresenter.IAuthenticationFormProps => {

    let validator = new AuthenticationFormValidator();

    return {
        authenticationTypeSelectedValue: state.authenticationState.authenticationType,
        crmUrl: state.authenticationState.crmUrl.value.toString(),
        crmUrlHasBeenTouched: state.authenticationState.crmUrl.hasBeenTouched,
        crmUrlIsValid: validator.validateCrmUrl(state.authenticationState.crmUrl.value.toString()),
        domain: state.authenticationState.domain.value.toString(),
        domainHasBeenTouched: state.authenticationState.domain.hasBeenTouched,
        domainIsValid: validator.validateDomain(state.authenticationState.domain.value.toString()),
        emailAddress: state.authenticationState.emailAddress.value.toString(),
        emailAddressHasBeenTouched: state.authenticationState.emailAddress.hasBeenTouched,
        emailAddressIsValid: validator.validateEmailAddress(state.authenticationState.emailAddress.value.toString()),
        hasStartedSubmit: state.authenticationState.loginStatus.hasStarted,
        password: state.authenticationState.password.value.toString(),
        passwordHasBeenTouched: state.authenticationState.password.hasBeenTouched,
        passwordIsValid: validator.validatePassword(state.authenticationState.password.value.toString()),
        shouldValidateForm: state.authenticationState.shouldValidateForm,
        submissionError: state.authenticationState.hasBeenSubmitted && state.authenticationState.loginStatus.hasCompleted && !state.authenticationState.loginStatus.result.successful
            ? "Unable to log in. Please check your credentials are correct"
            : "",
        username: state.authenticationState.username.value.toString(),
        usernameHasBeenTouched: state.authenticationState.username.hasBeenTouched,
        usernameIsValid: validator.validateUsername(state.authenticationState.username.value.toString()),
    };
};

const mapDispatchToProps = (dispatch: any): AuthenticationFormPresenter.IAuthenticationFormProps => {
    return {
        authenticationTypeOnChange: (authenticationType: number) => {
            dispatch(AuthenticationActionCreators.setAuthenticationType(authenticationType));
            dispatch(AuthenticationActionCreators.resetFormFields());
        },
        crmUrlOnBlur: () => dispatch(AuthenticationActionCreators.blurCrmUrl()),
        crmUrlOnChange: (url: string) => dispatch(AuthenticationActionCreators.setCrmUrl(url)),
        domainOnBlur: () => dispatch(AuthenticationActionCreators.blurDomain()),
        domainOnChange: (domain: string) => dispatch(AuthenticationActionCreators.setDomain(domain)),
        emailAddressOnBlur: () => dispatch(AuthenticationActionCreators.blurCrmEmailAddress()),
        emailAddressOnChange: (emailAddress: string) => dispatch(AuthenticationActionCreators.setEmailAddress(emailAddress)),
        onSubmit: (props: AuthenticationFormPresenter.IAuthenticationFormProps) => dispatch(AuthenticationActionCreators.submit(dispatch, props)),
        passwordOnBlur: () => dispatch(AuthenticationActionCreators.blurPassword()),
        passwordOnChange: (password: string) => dispatch(AuthenticationActionCreators.setPassword(password)),
        usernameOnBlur: () => dispatch(AuthenticationActionCreators.blurUsername()),
        usernameOnChange: (username: string) => dispatch(AuthenticationActionCreators.setUsername(username)),
    };
};

const AuthenticationForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthenticationFormPresenter.AuthenticationForm);

export default AuthenticationForm;
