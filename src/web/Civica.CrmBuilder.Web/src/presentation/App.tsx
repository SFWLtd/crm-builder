import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';
import Navigation from '../containers/navigation/Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class App extends React.Component<IAppProps, undefined> {
    render() {
        return <MuiThemeProvider>
            <div>
            <Navigation />
            {
                !this.props.isLoggedIn &&
                <AuthenticationForm />
            }
            </div>
        </MuiThemeProvider>;
    }
}

export interface IAppProps {
    isLoggedIn?: boolean;
}
