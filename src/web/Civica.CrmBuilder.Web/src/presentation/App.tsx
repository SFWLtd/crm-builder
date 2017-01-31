import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';

export class App extends React.Component<IAppProps, undefined> {
    render() {
        if (this.props.isLoggedIn) {
            return <div>Logged in!</div>;
        } else {
            return <div><AuthenticationForm /></div>;
        }
    }
}

export interface IAppProps {
    isLoggedIn?: boolean;
}
