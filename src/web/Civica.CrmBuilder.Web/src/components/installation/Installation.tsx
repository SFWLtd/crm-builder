import * as React from 'react';
import { Card } from '../shared/Card';
import { PageLoader } from '../shared/PageLoader';
import { FormWrapper } from '../forms/FormWrapper';
import { Submit } from '../forms/Submit';
import { Installer } from './Installer';
import { IInstallerResult } from './Installer';
import * as ApiClient from '../../../../../api/ApiClient';

export class Installation extends React.Component<undefined, IInstallationState> {

    startInstalling = () => {
        this.setState({ isInstalling: true, installationResult: null });
    };

    finishInstalling = (installationResult: IInstallerResult) => {
        this.setState({ isInstalling: false, installationResult: installationResult, requiresInstallation: !installationResult.succeeded });
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
                    <p className='Caption'>
                        {
                            (this.state.isInstalling || this.state.installationResult) &&
                            <Installer onFinished={this.finishInstalling} />
                        }
                    </p>
                    <br />
                    <Submit onSubmit={this.startInstalling} label='Install' showLoader={this.state.isInstalling} />
                </div>
            }
            {
                this.state.loaded && this.state.errors.length == 0 && this.state.requiresUpdate &&
                <div>
                    <Card title='Update required'>
                        <p className='Caption'>CRM builder needs to apply some updates to CRM before you can continue. Click install to proceed</p>
                    </Card>
                    <br />
                    <p className='Caption'>
                        {
                            (this.state.isInstalling || this.state.installationResult) &&
                            <Installer onFinished={this.finishInstalling} />
                        }
                    </p>
                    <br />
                    <Submit onSubmit={this.startInstalling} label='Install' showLoader={this.state.isInstalling} />
                </div>
            }
            {
                this.state.installationResult && this.state.installationResult.succeeded &&
                <div>
                    <Card title='CRM Builder is up to date'>
                        <p className='caption'>Version: {this.state.installationResult.currentVersion}</p>
                    </Card>
                </div>
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
    installationResult?: IInstallerResult;
}
