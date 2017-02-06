import { connect } from 'react-redux';
import * as BuildsPresenter from '../../presentation/builds/BuildsOverview';
import { NavigationIds } from '../../constants/NavigationIds';
import { IAppState } from '../../state/IAppState';

const mapStateToProps = (state: IAppState): BuildsPresenter.IBuildsOverviewProps => {
    return {
        navigationIsActive: state.navigationState.selectedNavigationId === NavigationIds.Builds 
            && state.authenticationState.loginStatus.hasCompleted
            && state.authenticationState.loginStatus.result.successful
    };
};

const mapDispatchToProps = (dispatch: any): BuildsPresenter.IBuildsOverviewProps => {
    return {};
};

const BuildsOverview = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildsPresenter.BuildsOverview);

export default BuildsOverview;