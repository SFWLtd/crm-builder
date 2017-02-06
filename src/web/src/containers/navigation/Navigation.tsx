import { connect } from 'react-redux';
import * as NavigationPresenter from '../../presentation/navigation/Navigation';
import * as NavigationActionCreators from '../../actions/navigation/NavigationActionCreators';
import * as AuthenticationActionCreators from '../../actions/authentication/AuthenticationActionCreators';
import { IAppState } from '../../state/IAppState';
import { Validate } from '../../validation/Validate';

const mapStateToProps = (state: IAppState): NavigationPresenter.INavigationProps => {
    return {
        selectedNavigationId: state.navigationState.selectedNavigationId,
        isLoggingOut: state.authenticationState.logOutStatus.hasStarted
    }
}

const mapDispatchToProps = (dispatch: any): NavigationPresenter.INavigationProps => {
    return {
        onSelectNavigationId: (selectedNavigationId: string) => dispatch(NavigationActionCreators.setActiveNavigation(selectedNavigationId)),
        onLogout: () => dispatch(AuthenticationActionCreators.beginLogOut(dispatch))
    }
}

const Navigation = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationPresenter.Navigation);

export default Navigation;