namespace Civica.CrmBuilder.Domain.Installation
{
    public class InstallationStatus
    {
        public bool IsInstalled { get; }

        public bool RequiresUpdate { get; }

        public InstallationStatus(bool isInstalled, bool requiresUpdate)
        {
            IsInstalled = isInstalled;
            RequiresUpdate = requiresUpdate;
        }
    }
}
