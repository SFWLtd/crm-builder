import { connect } from "react-redux";
import * as AuthenticationActionCreators from "../actions/AuthenticationActions";
import * as NavigationActionCreators from "../actions/NavigationActions";
import * as NavigationPresenter from "../presentation/Navigation";
import { IAppState } from "../state/AppState";
import { Validate } from "../validation/Validate";

const mapStateToProps = (state: IAppState): NavigationPresenter.INavigationProps => {
    return {
        isLoggingOut: state.authenticationState.logOutStatus.hasStarted,
        selectedNavigationId: state.navigationState.selectedNavigationId,
    };
};

const mapDispatchToProps = (dispatch: any): NavigationPresenter.INavigationProps => {
    return {
        onLogout: () => dispatch(AuthenticationActionCreators.beginLogOut(dispatch)),
        onSelectNavigationId: (selectedNavigationId: string) => dispatch(NavigationActionCreators.setActiveNavigation(selectedNavigationId)),
    };
};

const Navigation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationPresenter.Navigation);

export default Navigation;
