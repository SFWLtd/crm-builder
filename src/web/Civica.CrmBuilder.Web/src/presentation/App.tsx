import * as React from 'react';
import AuthenticationForm from '../containers/authentication/AuthenticationForm';
import Navigation from '../containers/navigation/Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { darkBlack, fullBlack, grey100, grey300, grey400, grey500 } from 'material-ui/styles/colors';
import { getMuiTheme } from 'material-ui/styles';

export class App extends React.Component<IAppProps, undefined> {

    theme = getMuiTheme({
        fontFamily: 'Roboto, sans-serif',
        palette: {
            primary1Color: '#00a499',
            primary2Color: '#e8e8e8',
            primary3Color: '#616161',
            accent1Color: grey100,
            accent2Color: grey300,
            accent3Color: grey500,
            textColor: darkBlack,
        },
    });

    render() {
        return <MuiThemeProvider muiTheme={this.theme}>
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
