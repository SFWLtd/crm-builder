import { connect } from "react-redux";
import * as ApiClient from "../../../api/ApiClient";
import * as BuildActions from "../actions/BuildActions";
import { NavigationIds } from "../constants/NavigationIds";
import * as BuildsPresenter from "../presentation/BuildsOverview";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): BuildsPresenter.IBuildsOverviewProps => {
    return {
        builds: state.buildState.builds.result !== null && state.buildState.builds.result.successful
            ? state.buildState.builds.result.result
            : new Array<ApiClient.BuildDto>(),
        isFetchingBuildForEdit: state.buildState.editBuildFormState.currentBuild.hasStarted,
        isFetchingBuilds: state.buildState.builds.hasStarted,
        navigationIsActive: state.navigationState.selectedNavigationId === NavigationIds.Builds
            && state.authenticationState.loginStatus.hasCompleted
            && state.authenticationState.loginStatus.result.successful,
    };
};

const mapDispatchToProps = (dispatch: any): BuildsPresenter.IBuildsOverviewProps => {
    return {
        deleteBuild: (buildId: string) => dispatch(BuildActions.showDeleteConfirmationDialog(buildId)),
        editBuild: (buildId: string) => dispatch(BuildActions.beginShowEditBuildForm(dispatch, buildId)),
        fetchBuilds: () => dispatch(BuildActions.startFetchingBuilds(dispatch)),
        newBuild: () => dispatch(BuildActions.showNewBuildForm()),
    };
};

const BuildsOverview = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BuildsPresenter.BuildsOverview);

export default BuildsOverview;
