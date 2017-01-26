import * as React from 'react';
import { Card } from '../shared/Card';
import { PageLoader } from '../shared/PageLoader';
import { FormWrapper } from '../forms/FormWrapper';
import { Submit } from '../forms/Submit';
import * as ApiClient from '../../../../../api/ApiClient';

export class Installation extends React.Component<undefined, IInstallationState> {

    install = () => {

    };
    
    constructor() {
        super();

        this.state = {
            loaded: false,
            requiresInstallation: false,
            requiresUpdate: false,
            errors: new Array<string>(),
            isInstalling: false
        };

        this.load();
    }

    load() {
        let installationClient = new ApiClient.InstallationClient('http://localhost:8001');
        installationClient.getInstallationStatus('')
            .then((result: ApiClient.GlobalJsonResultOfInstallationStatusResult) => {
                if (result.successful) {
                    this.setState({ requiresUpdate: result.result.requiresUpdate, requiresInstallation: !result.result.isInstalled });
                } else {
                    this.state.errors.push(result.errorMessage);
                }

                this.setState({ loaded: true });
            });
    }

    render() {
        let renderedErrors = new Array<any>();
        this.state.errors.forEach((err: string) => {
            renderedErrors.push(<p className='red-text'>{err}</p>);
        });

        return <div>
            {
                !this.state.loaded &&
                <PageLoader message='Retrieving installation status'/>
            }
            {
                this.state.loaded && this.state.errors.length == 0 && this.state.requiresInstallation &&
                <div>
                    <Card title='Installation required'>
                        <p className='Caption'>It looks like CRM Builder is not installed on your instance of CRM yet</p>
                    </Card>
                    <br />
                    <br />
                    <Submit onSubmit={this.install} label='Install' showLoader={this.state.isInstalling} />
                </div>
            }
            {
                this.state.loaded && this.state.errors.length == 0 && this.state.requiresUpdate &&
                <Card title='Update required'>
                    <p className='Caption'>CRM requires some updates before you can continue using CRM Builder. Click install to proceed</p>
                </Card>
            }
            {
                this.state.loaded && this.state.errors.length > 0 &&
                <div>
                    <Card title='Something went wrong' />
                    {renderedErrors}
                </div>
            }
        </div>;
    }
}

export interface IInstallationState {
    loaded?: boolean;
    errors?: Array<string>;
    requiresInstallation?: boolean;
    requiresUpdate?: boolean;
    isInstalling?: boolean;
}
