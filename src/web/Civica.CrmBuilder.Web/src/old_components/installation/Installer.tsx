import * as React from 'react';
import * as ApiClient from '../../../../../api/ApiClient';
import * as ExtendedClient from '../../api-extensions/installation-client/ExtendedInstallationClient';

export class Installer extends React.Component<IInstallerProps, IInstallerState> {

    updateInstallationMessage = (message: string) => {
        this.setState({ message: message });
    };

    onInstallationFinished = (result: ExtendedClient.IInstallerResult) => {
        this.setState({ started: false });

        this.props.onFinished(result);
    };

    private installationError: string;
    private rollbackMessage: string;

    constructor(props: IInstallerProps) {
        super(props);

        this.state = { started: false, currentResult: null, message: 'Installation starting...' };

        this.startInstallation();
    }

    startInstallation() {

        let installationClient = new ExtendedClient.ExtendedInstallationClient('http://localhost:8001');
        installationClient.startInstallation(new ApiClient.StartInstallationRequest(), '')
            .then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
                if (result.successful) {
                    this.setState({ started: true, currentResult: result });
                    this.continueInstallation();
                }
            });
    }

    continueInstallation(): void {
        let installationClient = new ExtendedClient.ExtendedInstallationClient('http://localhost:8001');
        installationClient.completeInstallation(this.state.currentResult, this.updateInstallationMessage, this.onInstallationFinished);
    }

    render() {
        return <span>{this.state.message}</span>
    }
}

export interface IInstallerProps {
    onFinished: (result: ExtendedClient.IInstallerResult) => void;
}

export interface IInstallerState {
    started?: boolean;
    currentResult?: ApiClient.GlobalJsonResultOfInstallationResult;
    message?: string;
}

