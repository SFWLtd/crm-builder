import { connect } from 'react-redux';
import * as AuthenticationFormPresenter from '../../presentation/authentication/AuthenticationForm';
import * as AuthenticationActionCreators from '../../actions/authentication/AuthenticationActionCreators';
import { IAppState } from '../../state/IAppState';
import { Validate } from '../../validation/Validate';

const mapStateToProps = (state: IAppState): AuthenticationFormPresenter.IAuthenticationFormProps => {
    return {
        authenticationTypeSelectedValue: state.authenticationState.authenticationType,
        crmUrl: state.authenticationState.crmUrl.value.toString(),
        crmUrlIsValid: Validate.thisString(state.authenticationState.crmUrl.value.toString()).url(),
        crmUrlHasBeenTouched: state.authenticationState.crmUrl.hasBeenTouched,
        emailAddress: state.authenticationState.emailAddress.value.toString(),
        emailAddressIsValid: Validate.thisString(state.authenticationState.emailAddress.value.toString()).email(),
        emailAddressHasBeenTouched: state.authenticationState.emailAddress.hasBeenTouched,
        domain: state.authenticationState.domain.value.toString(),
        domainIsValid: Validate.thisString(state.authenticationState.domain.value.toString()).length(1, 50),
        domainHasBeenTouched: state.authenticationState.domain.hasBeenTouched,
        usernameHasBeenTouched: state.authenticationState.username.hasBeenTouched,
        username: state.authenticationState.username.value.toString(),
        usernameIsValid: Validate.thisString(state.authenticationState.username.value.toString()).length(1, 50),
        passwordHasBeenTouched: state.authenticationState.password.hasBeenTouched,
        password: state.authenticationState.password.value.toString(),
        passwordIsValid: Validate.thisString(state.authenticationState.password.value.toString()).length(1, 50),
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
        passwordOnChange: (password: string) => dispatch(AuthenticationActionCreators.setPassword(password))
    }
}

const AuthenticationForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationFormPresenter.AuthenticationForm);

export default AuthenticationForm;
