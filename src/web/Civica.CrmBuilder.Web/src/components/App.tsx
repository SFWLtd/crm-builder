import * as React from 'react';
import * as ApiClient from '../../../../api/ApiClient';
import { NavBar } from './navigation/NavBar';
import { NavBarItem } from './navigation/NavBarItem';
import { BuildsOverview } from './main/BuildsOverview';
import { Welcome } from './main/Welcome';

export class App extends React.Component<undefined, IAppState> {

    loggedInHandler = (result: ApiClient.SessionTokenResult) => {
        this.setState({ loggedIn: true, selectedNavigationId: this.state.selectedNavigationId, isLoading: false });
    };

    onNavigationClick = (navBarItem: NavBarItem) => {
        this.setState({ loggedIn: this.state.loggedIn, selectedNavigationId: navBarItem.id, isLoading: false });
    };

    constructor() {
        super();

        this.state = {
            selectedNavigationId: 'homenavbaritem',
            loggedIn: false,
            isLoading: true
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
                    isLoading: false
                });
            });
    }

    render() {
        return <div>
            {!this.state.isLoading &&
                <div>
                    <NavBar onClick={this.onNavigationClick} loggedIn={this.state.loggedIn} loggedInHandler={this.loggedInHandler} />
                    <br />
                    <div className='wrap'>
                        {
                            this.state.selectedNavigationId === 'homenavbaritem' &&
                            <Welcome loggedIn={this.state.loggedIn} loggedInHandler={this.loggedInHandler} />
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

            {this.state.isLoading &&
                <div id='loader'>
                    <div className='center-align'>
                        <h5>Loading...</h5>
                    </div>
                    <div className='progress'>
                        <div className='indeterminate'>
                        </div>
                    </div>
                </div>
            }
        </div>;
    }
}

export interface IAppState {
    selectedNavigationId: string;
    isLoading: boolean;
    loggedIn: boolean;
}
