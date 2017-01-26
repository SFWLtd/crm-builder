using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Constants;
using Civica.CrmBuilder.Domain.Installation.Versions;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.DefaultEntities;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Installation
{
    public class Installation : IInstallation
    {
        private readonly ICrmPlusPlus crm;
        private readonly IList<IInstallationVersion> availableInstallationVersions;
        private readonly Version currentVersion;

        private Installation(ICrmPlusPlus crm)
        {
            this.crm = crm;

            // Get installation versions
            var installationVersionTypes = typeof(Installation).Assembly.GetTypes()
                .Where(t => typeof(IInstallationVersion).IsAssignableFrom(t)
                    && t.IsClass
                    && t.GetConstructors().Any(c => c.GetParameters().Count() == 0));

            availableInstallationVersions = installationVersionTypes
                .Select(vt => (IInstallationVersion)Activator.CreateInstance(vt))
                .ToList();

            // Get current version 
            var customizationClient = crm.GetCustomizationClientForSolution(CrmConstants.DefaultPublisherSettings, CrmConstants.DefaultSolutionSettings);

            var solutionQuery = Query
                .ForEntity<Solution>()
                .IncludeAllProperties()
                .Filter(FilterType.And, filter =>
                {
                    filter.Condition(s => s.Name, ConditionOperator.Equal, CrmConstants.DefaultSolutionSettings.Name);
                });

            var solution = crm.EntityClient.RetrieveMultiple(solutionQuery).Single(); // Cannot have more than one solution with the same name

            currentVersion = Version.Parse(solution.Version);

            // If the current version doesn't match the default or an available installation, throw an error
            Guard.This(currentVersion, "Corrupted installation. Please remove the solution from CRM")
                .CustomRule(v => currentVersion.CompareTo(Version.Parse(CrmConstants.InitialSolutionVersion)) == 0
                && !availableInstallationVersions.Select(i => i.Version).Contains(currentVersion));
        }

        public static IInstallation ForClient(IClientStore clientStore)
        {
            var client = clientStore.Get();

            return new Installation(client.Crm);
        }

        public InstallationStatus GetStatus()
        {
            var isInstalled = currentVersion != Version.Parse(CrmConstants.InitialSolutionVersion);
            var requiresUpdate = availableInstallationVersions.Any(v => v.Version.CompareTo(currentVersion) > 0)
                && isInstalled;

            return new InstallationStatus(isInstalled, requiresUpdate);
        }
    }
}
