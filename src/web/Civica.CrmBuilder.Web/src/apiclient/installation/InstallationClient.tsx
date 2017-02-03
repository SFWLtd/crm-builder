import * as ApiClient from '../../../../../api/ApiClient';

export class InstallationClient {

    private client: ApiClient.IInstallationClient;

    constructor(client: ApiClient.IInstallationClient) {
        this.client = client;
    }

    getStatus(): Promise<ApiClient.GlobalJsonResultOfInstallationStatusResult> {
        return this.client.getInstallationStatus('');
    }

    startInstallation(): Promise<ApiClient.GlobalJsonResultOfInstallationResult> {
        return this.client.startInstallation(new ApiClient.StartInstallationRequest(), '');
    }

    installNextComponent(previousResult: ApiClient.GlobalJsonResultOfInstallationResult): Promise<ApiClient.GlobalJsonResultOfInstallationResult> {

        let installationRequest = new ApiClient.ComponentInstallationRequest();
        installationRequest.installationComponentId = previousResult.result.nextComponentId;
        installationRequest.version = previousResult.result.nextComponentVersion;

        return this.client.installNextComponent(installationRequest, '');
    }

    rollback(currentResult: ApiClient.GlobalJsonResultOfInstallationResult): Promise<ApiClient.GlobalJsonResultOfRollbackResult> {
        let rollbackRequest = new ApiClient.RollbackRequest();
        rollbackRequest.failedInstallationComponentId = currentResult.result.componentId;
        rollbackRequest.failedInstallationVersion = currentResult.result.version;

        return this.client.rollbackComponentsForVersion(rollbackRequest, '');
    }
}

