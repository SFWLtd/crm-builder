using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Constants;
using Civica.CrmBuilder.Domain.CrmPlusPlusQueries;
using Civica.CrmBuilder.Domain.Installation.Versions;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.Domain.Installation
{
    public class Installation : IInstallation
    {
        private readonly ICrmPlusPlus crm;
        private readonly IList<InstallationVersion> availableInstallationVersions;
        private readonly Version currentVersion;

        internal Installation(ICrmPlusPlus crm)
        {
            this.crm = crm;

            // Get installation versions
            var installationVersionTypes = typeof(Installation).Assembly.GetTypes()
                .Where(t => typeof(InstallationVersion).IsAssignableFrom(t)
                    && t.IsClass
                    && !t.IsAbstract
                    && t.GetConstructors().Any(c => c.GetParameters().Count() == 0));

            availableInstallationVersions = installationVersionTypes
                .Select(vt => (InstallationVersion)Activator.CreateInstance(vt))
                .Where(iv => iv.InstallationComponents.Any() && iv.Version != null)
                .ToList();

            // Get current version 
            var customizationClient = crm.GetCustomizationClientForSolution(CrmConstants.DefaultPublisherSettings, CrmConstants.DefaultSolutionSettings);

            var solutionByNameQuery = SolutionQueries.SolutionByName(CrmConstants.DefaultSolutionSettings.Name);
            var solution = crm.EntityClient.RetrieveMultiple(solutionByNameQuery).Single(); // Cannot have more than one solution with the same name

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

        public ComponentInstallationResult StartInstallation()
        {
            var thisVersion = GetNextVersion(currentVersion);

            if (thisVersion == null)
            {
                return ComponentInstallationResult.Success();
            }

            int componentId = 0; // Installation version not included if there are no components (see ctor)

            return InstallComponent(componentId, thisVersion);
        }

        public ComponentInstallationResult InstallNextComponent(int componentId, Version installationVersion)
        {
            var thisVersion = availableInstallationVersions
                .SingleOrDefault(iv => iv.Version.CompareTo(installationVersion) == 0);

            if (thisVersion == null)
            {
                return ComponentInstallationResult.Fail(componentId, "unknown", installationVersion, "Installation version not found");
            }
            
            if (!thisVersion.InstallationComponents.ContainsKey(componentId))
            {
                return ComponentInstallationResult.Fail(componentId, "unknown", installationVersion, 
                    string.Format("Component with id {0} not found in installation version {1}", componentId, installationVersion));
            }

            return this.InstallComponent(componentId, thisVersion);
        }

        private ComponentInstallationResult InstallComponent(int componentId, InstallationVersion version)
        {
            var thisComponent = version.InstallationComponents[componentId];
            var nextComponent = GetNextInstallationComponent(version, componentId);

            var customizationClient = crm.GetCustomizationClientForSolution(CrmConstants.DefaultPublisherSettings, CrmConstants.DefaultSolutionSettings);

            try
            {
                thisComponent.InstallationAction.Compile().Invoke(customizationClient);

                return nextComponent.HasValue
                    ? ComponentInstallationResult.Success(componentId, thisComponent.Description, version.Version, true, nextComponent.Value.Key, nextComponent.Value.Value)
                    : ComponentInstallationResult.Success(componentId, thisComponent.Description, version.Version, true);
            }
            catch (Exception ex)
            {
                return ComponentInstallationResult.Fail(componentId, thisComponent.Description, version.Version, ex.Message);
            }
        }

        private InstallationVersion GetNextVersion(Version version)
        {
            return availableInstallationVersions
                .Where(iv => iv.Version.CompareTo(version) > 0)
                .OrderBy(x => x.Version)
                .FirstOrDefault();
        }

        private KeyValuePair<int, Version>? GetNextInstallationComponent(InstallationVersion version, int componentId)
        {
            if (version.InstallationComponents.ContainsKey(componentId + 1))
            {
                return new KeyValuePair<int, Version>(componentId + 1, version.Version);
            }
            else 
            {
                var nextVersion = GetNextVersion(version.Version);

                if (nextVersion != null)
                {
                    return new KeyValuePair<int, Version>(0, nextVersion.Version);
                }
            }

            return null;
        }

        public void RollbackInstallationVersion(int failedComponentId, Version failedInstallationVersion)
        {
            var thisVersion = availableInstallationVersions
                .SingleOrDefault(iv => iv.Version.CompareTo(failedInstallationVersion) == 0);

            Guard.This(thisVersion, string.Format("Rollback request was received, but version {0} was found on the system", failedInstallationVersion))
                .CustomRule(iv => iv != null);

            var customizationClient = crm.GetCustomizationClientForSolution(CrmConstants.DefaultPublisherSettings, CrmConstants.DefaultSolutionSettings);

            failedComponentId--; // The failed component doesn't require rollback. Start with the component installed before the failure
            while (failedComponentId >= 0)
            {
                if (thisVersion.InstallationComponents.ContainsKey(failedComponentId))
                {
                    var rollbackAction = thisVersion.InstallationComponents[failedComponentId].RollbackAction;
                    rollbackAction.Compile().Invoke(customizationClient);
                }

                failedComponentId--;
            }
        }
    }
}
