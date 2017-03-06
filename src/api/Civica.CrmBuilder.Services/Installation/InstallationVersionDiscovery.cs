using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Services.Installation.Versions;

namespace Civica.CrmBuilder.Services.Installation
{
    public class InstallationVersionDiscovery : IInstallationVersionDiscovery
    {
        private IList<InstallationVersion> installationVersions;

        public IList<InstallationVersion> Discover()
        {
            if (installationVersions == null)
            {
                var installationVersionTypes = typeof(InstallationService).Assembly.GetTypes()
                .Where(t => typeof(InstallationVersion).IsAssignableFrom(t)
                    && t.IsClass
                    && !t.IsAbstract
                    && t.GetConstructors().Any(c => c.GetParameters().Count() == 0));

                installationVersions = installationVersionTypes
                    .Select(vt => (InstallationVersion)Activator.CreateInstance(vt))
                    .Where(iv => iv.InstallationComponents.Any() && iv.Version != null)
                    .ToList();
            }

            return installationVersions;
        }
    }
}
