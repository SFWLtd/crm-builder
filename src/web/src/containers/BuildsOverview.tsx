import { connect } from 'react-redux';
import * as BuildsPresenter from '../presentation/BuildsOverview';
import * as BuildActions from '../actions/BuildActions';
import { NavigationIds } from '../constants/NavigationIds';
import { IAppState } from '../state/AppState';
import * as ApiClient from '../../../api/ApiClient';

const mapStateToProps = (state: IAppState): BuildsPresenter.IBuildsOverviewProps => {
    return {
        navigationIsActive: state.navigationState.selectedNavigationId === NavigationIds.Builds 
            && state.authenticationState.loginStatus.hasCompleted
            && state.authenticationState.loginStatus.result.successful,
        builds: state.buildState.builds.result !== null && state.buildState.builds.result.successful
            ? state.buildState.builds.result.result
            : new Array<ApiClient.BuildProperties>(),
        isFetchingBuilds: state.buildState.builds.hasStarted
    };
};

const mapDispatchToProps = (dispatch: any): BuildsPresenter.IBuildsOverviewProps => {
    return {
        newBuild: () => dispatch(BuildActions.showNewBuildForm()),
        fetchBuilds: () => dispatch(BuildActions.startFetchingBuilds(dispatch))
    }
};

const BuildsOverview = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildsPresenter.BuildsOverview);

export default BuildsOverview;