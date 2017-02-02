import * as ApiClient from '../../../../../api/ApiClient';

export class InstallationClient {

    private client: ApiClient.IInstallationClient;

    constructor(client: ApiClient.IInstallationClient) {
        this.client = client;
    }

    getStatus(): Promise<ApiClient.GlobalJsonResultOfInstallationStatusResult> {
        return this.client.getInstallationStatus('');
    }
}

