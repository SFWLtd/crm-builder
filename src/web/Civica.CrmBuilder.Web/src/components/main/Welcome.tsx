import * as React from 'react';
import * as ApiClient from '../../../../../api/ApiClient';
import { LoginForm } from '../authentication/LoginForm';
import { Card } from '../shared/Card';
import { Installation } from '../installation/Installation';

export class Welcome extends React.Component<IWelcomeProps, undefined> {

    constructor(props: IWelcomeProps) {
        super(props);
    }

    render() {
        return <div>
            {
                !this.props.loggedIn &&
                <div>
                    <Card title='Welcome to CRM Builder'>
                        <p>Continuous integration for CRM solutions.</p>
                        <br />
                    </Card>
                    <br />
                    <br />
                    <LoginForm loggedInStateHandler={this.props.loggedInHandler} />
                </div>
            }
            {
                this.props.loggedIn &&
                <Installation />
            }
        </div>;
    }
}

export interface IWelcomeProps {
    loggedIn: boolean;
    loggedInHandler: (result: ApiClient.SessionTokenResult) => void;
}
