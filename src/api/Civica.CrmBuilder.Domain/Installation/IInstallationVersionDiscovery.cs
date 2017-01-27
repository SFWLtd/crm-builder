using System.Collections.Generic;
using Civica.CrmBuilder.Domain.Installation.Versions;

namespace Civica.CrmBuilder.Domain.Installation
{
    public interface IInstallationVersionDiscovery
    {
        IList<InstallationVersion> Discover();
    }
}
