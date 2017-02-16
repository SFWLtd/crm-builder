import { connect } from "react-redux";
import * as InstallationActionCreators from "../actions/InstallationActions";
import * as InstallationPresenter from "../presentation/Installation";
import { IAppState } from "../state/AppState";
import { Validate } from "../validation/Validate";

const mapStateToProps = (state: IAppState): InstallationPresenter.IInstallationProps => {
    return {
        hasCompletedInstallation: state.installationState.installation.hasCompleted,
        hasLoaded: state.installationState.hasLoadedState,
        installationErrorMessage: state.installationState.installation.hasCompleted && !state.installationState.installation.result.successful
            ? state.installationState.installation.result.result.errorMessage
            : "",
        installationIsUpdate: state.installationState.status.hasCompleted
            && state.installationState.status.result.result.isInstalled
            && state.installationState.status.result.result.requiresUpdate,
        isInstalling: state.installationState.installation.hasStarted,
        requiresInstallation: state.installationState.status.hasCompleted
            && (!state.installationState.status.result.result.isInstalled || state.installationState.status.result.result.requiresUpdate),
    };
};

const mapDispatchToProps = (dispatch: any): InstallationPresenter.IInstallationProps => {
    return {
        install: () => dispatch(InstallationActionCreators.install(dispatch)),
        load: () => dispatch(InstallationActionCreators.loadInstallationStatus(dispatch)),
    };
};

const Installation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(InstallationPresenter.Installation);

export default Installation;
