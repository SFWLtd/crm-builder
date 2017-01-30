import * as React from 'react';
import * as ApiClient from '../../../../api/ApiClient';
import { NavBar } from './navigation/NavBar';
import { NavBarItem } from './navigation/NavBarItem';
import { BuildsOverview } from './main/BuildsOverview';
import { Welcome } from './main/Welcome';

export class App extends React.Component<undefined, IAppState> {

    loggedInHandler = (result: ApiClient.SessionTokenResult) => {
        this.setState({
            loggedIn: true,
            selectedNavigationId: this.state.selectedNavigationId,
            upToDate: this.state.upToDate
        });
    };

    upToDateHandler = (version: string) => {

        if (!this.state.upToDate) {
            this.setState({
                loggedIn: this.state.loggedIn,
                selectedNavigationId: this.state.selectedNavigationId,
                upToDate: true
            });
        }
    }

    onNavigationClick = (navBarItem: NavBarItem) => {
        this.setState({
            loggedIn: this.state.loggedIn,
            selectedNavigationId: navBarItem.id,
            upToDate: this.state.upToDate
        });
    };

    constructor() {
        super();

        this.state = {
            selectedNavigationId: 'homenavbaritem',
            loggedIn: false,
            upToDate: false,
            hasLoaded: false
        };

        this.load();
    }

    load() {
        let sessionClient = new ApiClient.SessionClient('http://localhost:8001');
        sessionClient.getSessionToken(new ApiClient.GetSessionTokenRequest(), '')
            .then((response: ApiClient.GlobalJsonResultOfSessionTokenResult) => {
                this.setState({
                    selectedNavigationId: this.state.selectedNavigationId,
                    loggedIn: response.statusCode === ApiClient.HttpStatusCode.OK,
                    hasLoaded: true,
                    upToDate: this.state.upToDate
                });
            });
    }

    render() {
        return <div>
            {this.state.hasLoaded &&
                <div>
                <NavBar onClick={this.onNavigationClick} loggedIn={this.state.loggedIn} upToDate={this.state.upToDate} loggedInHandler={this.loggedInHandler} />
                    <br />
                    <div className='wrap'>
                        {
                            this.state.selectedNavigationId === 'homenavbaritem' &&
                            <Welcome loggedIn={this.state.loggedIn} loggedInHandler={this.loggedInHandler} onUptoDateHandler={this.upToDateHandler} />
                        }
                        {
                            this.state.selectedNavigationId === 'buildsnavbaritem' &&
                            <BuildsOverview />
                        }
                        {
                        this.state.selectedNavigationId === 'settingsnavbaritem' &&
                            <div></div>
                        }

                    </div>
                </div>
            }
        </div>;
    }
}

export interface IAppState {
    selectedNavigationId: string;
    hasLoaded?: boolean;
    loggedIn: boolean;
    upToDate: boolean;
}
