import { connect } from 'react-redux';
import { IAppState } from '../state/IAppState';
import * as AppPresenter from '../presentation/App';

const mapStateToProps = (state: IAppState): AppPresenter.IAppProps => {
    return { isLoggedIn: state.authenticationState.loggedIn };
};

const mapDispatchToProps = (dispatch: any): AppPresenter.IAppProps => {
    return {}; // no dispatches
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppPresenter.App);

export default App;
