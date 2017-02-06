import { connect } from 'react-redux';
import { IAppState } from '../state/IAppState';
import * as AppPresenter from '../presentation/App';
import * as AppActionCreators from '../actions/AppActionCreators';

const mapStateToProps = (state: IAppState): AppPresenter.IAppProps => {
    return {
        isLoading: state.isLoading,
        isLoggedIn: state.authenticationState.loginStatus.hasCompleted && state.authenticationState.loginStatus.result.successful,
        isUpToDate: state.installationState.status.hasCompleted
            && state.installationState.status.result !== null
            && state.installationState.status.result.successful
            && state.installationState.status.result.result.isInstalled
            && state.installationState.hasLoadedState
            && !state.installationState.status.result.result.requiresUpdate,
        isCheckingInstallationState: !state.installationState.hasLoadedState && state.installationState.status.hasStarted
    };
};

const mapDispatchToProps = (dispatch: any): AppPresenter.IAppProps => {
    return {
        load: () => dispatch(AppActionCreators.load(dispatch))
    };
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppPresenter.App);

export default App;
