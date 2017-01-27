import * as React from 'react';
import * as ApiClient from '../../../../../api/ApiClient';

export class Installer extends React.Component<IInstallerProps, IInstallerState> {

    private installationError: string;
    private rollbackMessage: string;

    constructor(props: IInstallerProps) {
        super(props);

        this.state = { started: false, currentResult: null };

        this.startInstallation();
    }

    componentDidUpdate(prevProps: IInstallerProps, prevState: IInstallerState) {
        if (this.state.started) {
            let installationClient = new ApiClient.InstallationClient('http://localhost:8001');

            if (this.state.currentResult.isSuccess) {
                if (this.state.currentResult.moreToInstall) {
                    let nextInstallationRequest = new ApiClient.ComponentInstallationRequest();
                    nextInstallationRequest.installationComponentId = this.state.currentResult.nextComponentId;
                    nextInstallationRequest.version = this.state.currentResult.nextComponentVersion;

                    installationClient.installNextComponent(nextInstallationRequest, '')
                        .then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
                            this.setState({ currentResult: result.result, message: 'Installing component: ' + result.result.componentDescription });
                        });
                } else {
                    this.setState({ message: 'Installation successful' });
                    this.props.onFinished({ succeeded: true, currentVersion: this.state.currentResult.version });
                }
            } else {
                let rollbackVersionRequest = new ApiClient.RollbackRequest();
                rollbackVersionRequest.failedInstallationComponentId = this.state.currentResult.componentId;
                rollbackVersionRequest.failedInstallationVersion = this.state.currentResult.version;

                installationClient.rollbackComponentsForVersion(rollbackVersionRequest, '')
                    .then((result: ApiClient.GlobalJsonResultOfRollbackResult) => {
                        if (result.successful) {
                            this.props.onFinished({
                                succeeded: false,
                                currentVersion: result.result.currentVersion,
                                installationErrorMessage: this.state.currentResult.errorMessage
                            });
                        } else {
                            this.props.onFinished({
                                succeeded: false,
                                installationErrorMessage: this.state.currentResult.errorMessage,
                                rollbackErrorMessage: result.errorMessage
                            });
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
                    this.setState({ started: true, currentResult: result.result, message: 'Installation started...' })
                }
            });
    }

    render() {
        return <span>{this.state.message}</span>
    }
}

export interface IInstallerProps {
    onFinished: (result: IInstallerResult) => void;
}

export interface IInstallerState {
    started?: boolean;
    currentResult?: ApiClient.InstallationResult;
    message?: string;
}

export interface IInstallerResult {
    succeeded: boolean,
    currentVersion?: string,
    installationErrorMessage?: string,
    rollbackErrorMessage?: string
}