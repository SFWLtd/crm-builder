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
        emailAddressHasBeenTouched: state.authenticationState.emailAddress.hasBeenTouched
    }
}

const mapDispatchToProps = (dispatch: any): AuthenticationFormPresenter.IAuthenticationFormProps => {
    return {
        crmUrlOnBlur: () => dispatch(AuthenticationActionCreators.blurCrmUrl()),
        emailAddressOnBlur: () => dispatch(AuthenticationActionCreators.blurCrmEmailAddress()),
        authenticationTypeOnChange: (authenticationType: number) => dispatch(AuthenticationActionCreators.setAuthenticationType(authenticationType)),
        crmUrlOnChange: (url: string) => dispatch(AuthenticationActionCreators.setCrmUrl(url)),
        emailAddressOnChange: (emailAddress: string) => dispatch(AuthenticationActionCreators.setEmailAddress(emailAddress))
    }
}

const AuthenticationForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationFormPresenter.AuthenticationForm);

export default AuthenticationForm;
