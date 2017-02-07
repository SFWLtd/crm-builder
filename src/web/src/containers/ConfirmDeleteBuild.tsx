import { connect } from 'react-redux';
import * as ConfirmDeleteBuildPresenter from '../presentation/ConfirmDeleteBuild';
import { IAppState } from '../state/AppState';
import * as BuildActions from '../actions/BuildActions';
import * as ApiClient from '../../../api/ApiClient';

const mapStateToProps = (state: IAppState): ConfirmDeleteBuildPresenter.IConfirmDeleteBuildProps => {
    return {
        buildId: state.buildState.confirmDeleteDialog.buildId,
        isSubmitting: state.buildState.confirmDeleteDialog.submission.hasStarted,
        shouldDisplay: state.buildState.confirmDeleteDialog.show
    };
};

const mapDispatchToProps = (dispatch: any): ConfirmDeleteBuildPresenter.IConfirmDeleteBuildProps => {
    return {
        onFormCancel: () => dispatch(BuildActions.closeDeleteConfirmationDialog()),
        onFormSubmit: (buildId: string) => dispatch(BuildActions.startDeletingBuild(dispatch, buildId))
    }
};

const ConfirmDeleteBuild = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteBuildPresenter.ConfirmDeleteBuild);

export default ConfirmDeleteBuild;