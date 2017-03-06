using System.Collections.Generic;
using Civica.CrmBuilder.Services.Installation.Versions;

namespace Civica.CrmBuilder.Services.Installation
{
    public interface IInstallationVersionDiscovery
    {
        IList<InstallationVersion> Discover();
    }
}
