using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
{
    public abstract class InstallationVersion
    {
        private readonly Dictionary<int, InstallationComponent> installationComponents;

        public Version Version { get; }

        public IReadOnlyDictionary<int, InstallationComponent> InstallationComponents { get { return installationComponents; } }

        protected InstallationVersion(Version version)
        {
            Version = version;

            this.installationComponents = new Dictionary<int, InstallationComponent>();
        }

        protected void RegisterNextComponent(InstallationComponent installationComponent)
        {
            var nextComponentKey = !installationComponents.Any()
                ? 0
                : installationComponents.Keys.OrderByDescending(k => k).First() + 1;

            installationComponents.Add(nextComponentKey, installationComponent);
        }
    }
}
