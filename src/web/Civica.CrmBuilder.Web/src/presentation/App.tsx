import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';
import Navigation from '../containers/navigation/Navigation';

export class App extends React.Component<IAppProps, undefined> {
    render() {
        return <div>
            <Navigation />
            {
                !this.props.isLoggedIn &&
                <AuthenticationForm />
            }                
        </div>;
    }
}

export interface IAppProps {
    isLoggedIn?: boolean;
}
