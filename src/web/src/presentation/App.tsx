import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';
import Navigation from '../containers/navigation/Navigation';
import Installation from '../containers/installation/Installation';
import Loading from '../containers/loading/Loading';
import BuildsOverview from '../containers/builds/BuildsOverview';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

export class App extends React.Component<IAppProps, undefined> {

    componentDidMount() {
        this.props.load();
    }

    render() {

        return <div>
        <Container textAlign='center'>
                <Loading/>
                {   
                    this.props.isLoading &&
                    <Dimmer active={this.props.isLoading} page>
                        <Loader>Retrieving log in status...</Loader>
                    </Dimmer>
                }
                {
                    !this.props.isLoading && !this.props.isLoggedIn &&
                    <AuthenticationForm />
                }
                {
                    !this.props.isLoading && this.props.isLoggedIn && !this.props.isUpToDate &&
                    <Installation />
                }
                {
                    !this.props.isLoading && this.props.isLoggedIn && this.props.isUpToDate &&
                    <Navigation />
                }
                
                <br/>
                <Container textAlign='left'>
                    <BuildsOverview/>
                </Container>
            </Container>
            </div>;
    }
}

export interface IAppProps {
    isLoading?: boolean;
    load?: () => void;
    isLoggedIn?: boolean;
    isUpToDate?: boolean;
}
