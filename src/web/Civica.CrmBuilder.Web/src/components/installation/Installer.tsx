import * as React from 'react';
import * as ApiClient from '../../../../../api/ApiClient';

export class Installer extends React.Component<IInstallerProps, IInstallerState> {

    private installationError: string;
    private rollbackMessage: string;

    constructor(props: IInstallerProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.state.started) {
            this.startInstallation();
        } else {
            let installationClient = new ApiClient.InstallationClient('http://localhost:8001');

            if (this.state.currentResult.isSuccess) {
                if (this.state.currentResult.moreToInstall) {
                    let nextInstallationRequest = new ApiClient.ComponentInstallationRequest();
                    nextInstallationRequest.installationComponentId = this.state.currentResult.nextComponentId;
                    nextInstallationRequest.version = this.state.currentResult.nextComponentVersion;

                    installationClient.installNextComponent(nextInstallationRequest, '')
                        .then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
                            this.setState({ currentResult: result.result })
                        });
                } else {
                    this.props.onFinished('Installation successful', null);
                }
            } else {
                let rollbackVersionRequest = new ApiClient.RollbackRequest();
                rollbackVersionRequest.failedInstallationComponentId = this.state.currentResult.componentId;
                rollbackVersionRequest.failedInstallationVersion = this.state.currentResult.version;

                installationClient.rollbackComponentsForVersion(rollbackVersionRequest, '')
                    .then((result: ApiClient.GlobalJsonResultOfEmptyResult) => {
                        if (result.successful) {
                            this.props.onFinished('Installation unsuccesful: ' + this.state.currentResult.errorMessage,
                                'Rollback of the installation was successful');
                        } else {
                            this.props.onFinished('Installation unsuccesful: ' + this.state.currentResult.errorMessage,
                                'Rollback of the installation also failed: ' + result.errorMessage);
                        }
                    });
            }
        }
    }

    startInstallation() {
        let installationClient = new ApiClient.InstallationClient('http://localhost:8001');
        installationClient.startInstallation(new ApiClient.StartInstallationRequest(), '')
            .then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
                if (result.successful) {
                    this.setState({started: true, currentResult: result.result})
                }
            });
    }

    render() {
        return <span>{this.state.currentResult.componentDescription}...</span>
    }
}

export interface IInstallerProps {
    installationAction: InstallationAction;
    onFinished: (installationMessage: string, rollbackMessage: string) => void;
}

export interface IInstallerState {
    started?: boolean;
    currentResult?: ApiClient.InstallationResult;
}

export enum InstallationAction {
    Install,
    Update
}
