import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';
import Navigation from '../containers/navigation/Navigation';

export class App extends React.Component<IAppProps, undefined> {
    render() {
        return <div>
            <Navigation/>
        </div>;
    }
}

export interface IAppProps {
    isLoggedIn?: boolean;
}
