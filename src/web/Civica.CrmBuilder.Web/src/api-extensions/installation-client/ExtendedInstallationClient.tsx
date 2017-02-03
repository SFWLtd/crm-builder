import * as ApiClient from '../../../../../api/ApiClient';

export class ExtendedInstallationClient extends ApiClient.InstallationClient {

    completeInstallation(previousResult: ApiClient.GlobalJsonResultOfInstallationResult, messageHandler: ((message: string) => void), resultHandler: (result: IInstallerResult) => void): void {

        if (!previousResult.successful) {
            resultHandler({ succeeded: false, currentVersion: 'unknown', installationErrorMessage: previousResult.errorMessage });
        } else {
            messageHandler('Processing component with description \'' + previousResult.result.componentDescription + '\'');
        }

        if (previousResult.result.isSuccess && !previousResult.result.moreToInstall) {
            resultHandler({ succeeded: true, currentVersion: previousResult.result.version });
        }

        if (previousResult.result.isSuccess && previousResult.result.moreToInstall) {

            messageHandler('Current installation action: ' + previousResult.result.componentDescription);

            let nextInstallationRequest = new ApiClient.ComponentInstallationRequest();
            nextInstallationRequest.installationComponentId = previousResult.result.nextComponentId;
            nextInstallationRequest.version = previousResult.result.nextComponentVersion;

            this.installNextComponent(nextInstallationRequest, '')
                .then((result: ApiClient.GlobalJsonResultOfInstallationResult) => {
                    this.completeInstallation(result, messageHandler, resultHandler);
                });
        }

        if (!previousResult.result.isSuccess) {
            messageHandler('Installation failed. Rolling back...');

            let rollbackRequest = new ApiClient.RollbackRequest();
            rollbackRequest.failedInstallationComponentId = previousResult.result.componentId;
            rollbackRequest.failedInstallationVersion = previousResult.result.version;

            this.rollbackComponentsForVersion(rollbackRequest, '')
                .then((rollbackResult: ApiClient.GlobalJsonResultOfRollbackResult) => {
                    if (rollbackResult.successful) {
                        resultHandler({
                            succeeded: false,
                            currentVersion: rollbackResult.result.currentVersion,
                            installationErrorMessage: previousResult.result.errorMessage
                        });
                    } else {
                        resultHandler({
                            succeeded: false,
                            currentVersion: rollbackResult.result.currentVersion,
                            installationErrorMessage: previousResult.result.errorMessage,
                            rollbackErrorMessage: rollbackResult.errorMessage
                        });
                    }
                });
        }
    }
}

export interface IInstallerResult {
    succeeded: boolean,
    currentVersion?: string,
    installationErrorMessage?: string,
    rollbackErrorMessage?: string
}
