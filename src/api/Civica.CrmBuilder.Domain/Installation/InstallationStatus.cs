using System;

namespace Civica.CrmBuilder.Services.Installation
{
    public class InstallationStatus
    {
        public bool IsInstalled { get; }

        public bool RequiresUpdate { get; }

        public Version CurrentVersion { get; }

        public InstallationStatus(bool isInstalled, bool requiresUpdate, Version currentVersion)
        {
            IsInstalled = isInstalled;
            RequiresUpdate = requiresUpdate;
            CurrentVersion = currentVersion;
        }
    }
}
