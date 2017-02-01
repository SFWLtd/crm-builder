import { connect } from 'react-redux';
import * as AuthenticationFormPresenter from '../../presentation/authentication/AuthenticationForm';
import * as AuthenticationActionCreators from '../../actions/authentication/AuthenticationActionCreators';
import { IAppState } from '../../state/IAppState';
import { AuthenticationFormValidator } from '../../validation/authentication/AuthenticationFormValidator'

const mapStateToProps = (state: IAppState): AuthenticationFormPresenter.IAuthenticationFormProps => {

    let validator = new AuthenticationFormValidator();

    return {
        authenticationTypeSelectedValue: state.authenticationState.authenticationType,
        crmUrl: state.authenticationState.crmUrl.value.toString(),
        crmUrlIsValid: validator.ValidateCrmUrl(state.authenticationState.crmUrl.value.toString()),
        crmUrlHasBeenTouched: state.authenticationState.crmUrl.hasBeenTouched,
        emailAddress: state.authenticationState.emailAddress.value.toString(),
        emailAddressIsValid: validator.ValidateEmailAddress(state.authenticationState.emailAddress.value.toString()),
        emailAddressHasBeenTouched: state.authenticationState.emailAddress.hasBeenTouched,
        domain: state.authenticationState.domain.value.toString(),
        domainIsValid: validator.ValidateDomain(state.authenticationState.domain.value.toString()),
        domainHasBeenTouched: state.authenticationState.domain.hasBeenTouched,
        usernameHasBeenTouched: state.authenticationState.username.hasBeenTouched,
        username: state.authenticationState.username.value.toString(),
        usernameIsValid: validator.ValidateUsername(state.authenticationState.username.value.toString()),
        passwordHasBeenTouched: state.authenticationState.password.hasBeenTouched,
        password: state.authenticationState.password.value.toString(),
        passwordIsValid: validator.ValidatePassword(state.authenticationState.password.value.toString()),
        shouldValidateForm: state.authenticationState.shouldValidateForm,
        hasStartedSubmit: state.authenticationState.loginStatus.hasStarted,
        submissionError: state.authenticationState.loginStatus.hasCompleted && !state.authenticationState.loginStatus.result.successful
            ? 'Unable to log in. Please check your credentials are correct'
            : '',
        currentSubmissionMessage: state.authenticationState.loginStatus.latestMessage
    }
}

const mapDispatchToProps = (dispatch: any): AuthenticationFormPresenter.IAuthenticationFormProps => {
    return {
        crmUrlOnBlur: () => dispatch(AuthenticationActionCreators.blurCrmUrl()),
        emailAddressOnBlur: () => dispatch(AuthenticationActionCreators.blurCrmEmailAddress()),
        domainOnBlur: () => dispatch(AuthenticationActionCreators.blurDomain()),
        passwordOnBlur: () => dispatch(AuthenticationActionCreators.blurPassword()),
        usernameOnBlur: () => dispatch(AuthenticationActionCreators.blurUsername()),
        authenticationTypeOnChange: (authenticationType: number) => {
            dispatch(AuthenticationActionCreators.setAuthenticationType(authenticationType));
            dispatch(AuthenticationActionCreators.resetFormFields());
        },
        crmUrlOnChange: (url: string) => dispatch(AuthenticationActionCreators.setCrmUrl(url)),
        emailAddressOnChange: (emailAddress: string) => dispatch(AuthenticationActionCreators.setEmailAddress(emailAddress)),
        domainOnChange: (domain: string) => dispatch(AuthenticationActionCreators.setDomain(domain)),
        usernameOnChange: (username: string) => dispatch(AuthenticationActionCreators.setUsername(username)),
        passwordOnChange: (password: string) => dispatch(AuthenticationActionCreators.setPassword(password)),
        onSubmit: (props: AuthenticationFormPresenter.IAuthenticationFormProps) => dispatch(AuthenticationActionCreators.submit(dispatch, props, 'Logging in...'))
    }
}

const AuthenticationForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationFormPresenter.AuthenticationForm);

export default AuthenticationForm;
