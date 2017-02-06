import { connect } from 'react-redux';
import * as LoadingPresenter from '../../presentation/loading/Loading';
import * as LoadingActionCreators from '../../actions/loading/LoadingActionCreators';
import { IAppState } from '../../state/IAppState';

const mapStateToProps = (state: IAppState): LoadingPresenter.ILoadingProps => {
    return {
        isLoading: state.loadingState.isLoading,
        description: state.loadingState.description,
        title: state.loadingState.title
    };
};

const mapDispatchToProps = (dispatch: any): LoadingPresenter.ILoadingProps => {
    return {};
};

const Installation = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingPresenter.Loading);

export default Installation;