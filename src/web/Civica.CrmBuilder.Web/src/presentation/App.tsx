import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';
import Navigation from '../containers/navigation/Navigation';
import { Container } from 'semantic-ui-react';

export class App extends React.Component<IAppProps, undefined> {


    render() {
        return <Container>
                {
                    !this.props.isLoggedIn &&
                    <AuthenticationForm />
                }
                {
                    this.props.isLoggedIn &&
                    <Navigation />
                }
        </Container>;
    }
}

export interface IAppProps {
    isLoggedIn?: boolean;
}
