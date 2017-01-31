import { connect } from 'react-redux';
import * as AuthenticationFormPresenter from '../../presentation/authentication/AuthenticationForm';
import * as AuthenticationActionCreators from '../../actions/authentication/AuthenticationActionCreators';
import { IAppState } from '../../state/IAppState';
import { Validate } from '../../validation/Validate';

const mapStateToProps = (state: IAppState): AuthenticationFormPresenter.IAuthenticationFormProps => {
    return {
        crmUrl: state.authenticationState.crmUrl,
        crmUrlIsValid: Validate.thisString(state.authenticationState.crmUrl).url(),
        emailAddress: state.authenticationState.emailAddress,
        emailAddressIsValid: Validate.thisString(state.authenticationState.emailAddress).email()
    }
}

const mapDispatchToProps = (dispatch: any): AuthenticationFormPresenter.IAuthenticationFormProps => {
    return {
        crmUrlOnChange: (url: string) => dispatch(AuthenticationActionCreators.setCrmUrl(url)),
        emailAddressOnChange: (emailAddress: string) => dispatch(AuthenticationActionCreators.setEmailAddress(emailAddress))
    }
}

const AuthenticationForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationFormPresenter.AuthenticationForm);

export default AuthenticationForm;
