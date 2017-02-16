import { connect } from "react-redux";
import * as AppActions from "../actions/AppActions";
import * as AppPresenter from "../presentation/App";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): AppPresenter.IAppProps => {
    return {
        isCheckingInstallationState: !state.installationState.hasLoadedState && state.installationState.status.hasStarted,
        isLoading: state.authenticationState.loginStatus.hasStarted,
        isLoggedIn: state.authenticationState.loginStatus.hasCompleted
            && state.authenticationState.loginStatus.result.successful
            && state.authenticationState.loginStatus.result.result,
        isUpToDate: state.installationState.status.hasCompleted
            && state.installationState.status.result !== null
            && state.installationState.status.result.successful
            && state.installationState.status.result.result.isInstalled
            && state.installationState.hasLoadedState
            && !state.installationState.status.result.result.requiresUpdate,
    };
};

const mapDispatchToProps = (dispatch: any): AppPresenter.IAppProps => {
    return {
        load: () => dispatch(AppActions.load(dispatch)),
    };
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppPresenter.App);

export default App;
