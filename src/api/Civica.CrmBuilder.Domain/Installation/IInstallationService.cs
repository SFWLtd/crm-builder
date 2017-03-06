using System;

namespace Civica.CrmBuilder.Services.Installation
{
    public interface IInstallationService
    {
        InstallationStatus GetStatus();

        Version GetCurrentVersion();

        ComponentInstallationResult StartInstallation();

        ComponentInstallationResult InstallNextComponent(int componentId, Version installationVersion);

        void RollbackInstallationVersion(int failedComponentId, Version failedInstallationVersion);
    }
}
