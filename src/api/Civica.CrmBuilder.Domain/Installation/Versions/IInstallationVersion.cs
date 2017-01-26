using System.Collections.Generic;
using Civica.CrmBuilder.Domain.Installation.Components;
using Civica.CrmBuilder.Domain.Versioning;

namespace Civica.CrmBuilder.Domain.Installation.Versions
{
    public interface IInstallationVersion : IVersionable
    {
        IList<InstallationComponent> InstallationComponents { get; }
    }
}
