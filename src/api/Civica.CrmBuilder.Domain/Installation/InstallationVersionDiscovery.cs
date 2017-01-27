using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Domain.Installation.Versions;

namespace Civica.CrmBuilder.Domain.Installation
{
    public class InstallationVersionDiscovery : IInstallationVersionDiscovery
    {
        public IList<InstallationVersion> Discover()
        {
            var installationVersionTypes = typeof(Installation).Assembly.GetTypes()
                .Where(t => typeof(InstallationVersion).IsAssignableFrom(t)
                    && t.IsClass
                    && !t.IsAbstract
                    && t.GetConstructors().Any(c => c.GetParameters().Count() == 0));

            return installationVersionTypes
                .Select(vt => (InstallationVersion)Activator.CreateInstance(vt))
                .Where(iv => iv.InstallationComponents.Any() && iv.Version != null)
                .ToList();
        }
    }
}
