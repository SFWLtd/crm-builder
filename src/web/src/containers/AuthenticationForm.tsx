import { connect } from 'react-redux';
import * as AuthenticationFormPresenter from '..//presentation/AuthenticationForm';
import * as AuthenticationActionCreators from '../actions/AuthenticationActions';
import { IAppState } from '../state/AppState';
import { AuthenticationFormValidator } from '../validation/AuthenticationFormValidator';

const mapStateToProps = (state: IAppState): AuthenticationFormPresenter.IAuthenticationFormProps => {

    let validator = new AuthenticationFormValidator();

    return {
        authenticationTypeSelectedValue: state.authenticationState.authenticationType,
        crmUrl: state.authenticationState.crmUrl.value.toString(),
        crmUrlIsValid: validator.validateCrmUrl(state.authenticationState.crmUrl.value.toString()),
        crmUrlHasBeenTouched: state.authenticationState.crmUrl.hasBeenTouched,
        emailAddress: state.authenticationState.emailAddress.value.toString(),
        emailAddressIsValid: validator.validateEmailAddress(state.authenticationState.emailAddress.value.toString()),
        emailAddressHasBeenTouched: state.authenticationState.emailAddress.hasBeenTouched,
        domain: state.authenticationState.domain.value.toString(),
        domainIsValid: validator.validateDomain(state.authenticationState.domain.value.toString()),
        domainHasBeenTouched: state.authenticationState.domain.hasBeenTouched,
        usernameHasBeenTouched: state.authenticationState.username.hasBeenTouched,
        username: state.authenticationState.username.value.toString(),
        usernameIsValid: validator.validateUsername(state.authenticationState.username.value.toString()),
        passwordHasBeenTouched: state.authenticationState.password.hasBeenTouched,
        password: state.authenticationState.password.value.toString(),
        passwordIsValid: validator.validatePassword(state.authenticationState.password.value.toString()),
        shouldValidateForm: state.authenticationState.shouldValidateForm,
        hasStartedSubmit: state.authenticationState.loginStatus.hasStarted,
        submissionError: state.authenticationState.hasBeenSubmitted && state.authenticationState.loginStatus.hasCompleted && !state.authenticationState.loginStatus.result.successful
            ? 'Unable to log in. Please check your credentials are correct'
            : ''
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
        onSubmit: (props: AuthenticationFormPresenter.IAuthenticationFormProps) => dispatch(AuthenticationActionCreators.submit(dispatch, props))
    }
}

const AuthenticationForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationFormPresenter.AuthenticationForm);

export default AuthenticationForm;
