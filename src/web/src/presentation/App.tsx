import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';
import Navigation from '../containers/navigation/Navigation';
import Installation from '../containers/installation/Installation';
import BuildsOverview from '../containers/builds/BuildsOverview';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

export class App extends React.Component<IAppProps, undefined> {

    componentDidMount() {
        this.props.load();
    }

    render() {

        return <div>
        <Container textAlign='center'>
                <Dimmer active={this.props.isLoading} page>
                    <Loader>
                        <p>Checking log in status...</p>
                    </Loader>
                </Dimmer>
                <Dimmer active={this.props.isCheckingInstallationState} page>
                    <Loader>
                        <p>Checking installation status...</p>
                    </Loader>
                </Dimmer>
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
                    <div>
                        <Navigation />
                        <br/>
                        <Container textAlign='left'>
                            <BuildsOverview/>
                        </Container>
                    </div>
                }

            </Container>
            </div>;
    }
}

export interface IAppProps {
    isLoading?: boolean;
    load?: () => void;
    isLoggedIn?: boolean;
    isCheckingInstallationState?: boolean;
    isUpToDate?: boolean;
}
