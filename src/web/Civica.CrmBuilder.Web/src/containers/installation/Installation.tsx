import { connect } from 'react-redux';
import * as InstallationPresenter from '../../presentation/installation/Installation';
import * as InstallationActionCreators from '../../actions/installation/InstallationActionCreators';
import { IAppState } from '../../state/IAppState';
import { Validate } from '../../validation/Validate';

const mapStateToProps = (state: IAppState): InstallationPresenter.IInstallationProps => {
    return {
        requiresInstallation: state.installationState.status.hasCompleted
            && (!state.installationState.status.result.result.isInstalled || state.installationState.status.result.result.requiresUpdate),
        installationIsUpdate: state.installationState.status.hasCompleted
            && state.installationState.status.result.result.isInstalled
            && state.installationState.status.result.result.requiresUpdate,
        hasLoaded: state.installationState.hasLoadedState
    };
};

const mapDispatchToProps = (dispatch: any): InstallationPresenter.IInstallationProps => {
    return {
        load: () => dispatch(InstallationActionCreators.loadInstallationStatus(dispatch))
    };
};

const Installation = connect(
    mapStateToProps,
    mapDispatchToProps
)(InstallationPresenter.Installation);

export default Installation;