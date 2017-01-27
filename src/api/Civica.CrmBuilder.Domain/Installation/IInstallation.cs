using System;

namespace Civica.CrmBuilder.Domain.Installation
{
    public interface IInstallation
    {
        InstallationStatus GetStatus();

        ComponentInstallationResult StartInstallation();

        ComponentInstallationResult InstallNextComponent(int componentId, Version installationVersion);

        void RollbackInstallationVersion(int failedComponentId, Version failedInstallationVersion);
    }
}
