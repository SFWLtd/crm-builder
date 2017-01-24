import * as React from 'react';
import * as ApiClient from '../../../../../api/ApiClient';
import { LoginForm } from '../authentication/LoginForm';

export class Welcome extends React.Component<IWelcomeProps, undefined> {

    constructor(props: IWelcomeProps) {
        super(props);
    }

    render() {
        return <div>
            <div className='card blue-grey darken-1'>
                <div className='card-content white-text'>
                    <span className='card-title'>Welcome to CRM Builder</span>
                    <p>Continuous integration for CRM solutions.</p>
                    <br />
                </div>
            </div>
            <br />
            <br />
            {
                !this.props.loggedIn &&
                <LoginForm loggedInStateHandler={this.props.loggedInHandler} />
            }
        </div>;
    }
}

export interface IWelcomeProps {
    loggedIn: boolean;
    loggedInHandler: (result: ApiClient.SessionTokenResult) => void;
}
