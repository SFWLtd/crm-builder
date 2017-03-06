using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Constants;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmBuilder.DataAccess;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Services.Installation.Versions;

namespace Civica.CrmBuilder.Services.Installation
{
    public class InstallationService : IInstallationService
    {
        private readonly IDataAccessDispatcher dataAccessDispatcher;
        private readonly IInstallationVersionDiscovery discovery;

        public InstallationService(IInstallationVersionDiscovery discovery, IDataAccessDispatcher dataAccessDispatcher)
        {
            this.dataAccessDispatcher = dataAccessDispatcher;
            this.discovery = discovery;           
        }

        public InstallationStatus GetStatus()
        {
            var availableInstallationVersions = discovery.Discover();
            var currentVersion = GetCurrentVersion();

            Guard.This(currentVersion, "Corrupted installation. Please remove the solution from CRM")
                .CustomRule(v => currentVersion.CompareTo(Version.Parse(CrmConstants.InitialSolutionVersion)) == 0
                || availableInstallationVersions.Any(i => i.Version.CompareTo(currentVersion) == 0));

            var isInstalled = currentVersion != Version.Parse(CrmConstants.InitialSolutionVersion);
            var requiresUpdate = availableInstallationVersions.Any(v => v.Version.CompareTo(currentVersion) > 0)
                && isInstalled;

            return new InstallationStatus(isInstalled, requiresUpdate, currentVersion);
        }

        public ComponentInstallationResult StartInstallation()
        {
            var currentVersion = GetCurrentVersion();
            var thisVersion = GetNextVersion(currentVersion);

            if (thisVersion == null)
            {
                return ComponentInstallationResult.Success(Version.Parse(CrmConstants.InitialSolutionVersion));
            }

            var thisComponent = thisVersion.InstallationComponents[0];

            return ComponentInstallationResult.Success(null, thisVersion.Version, 0, thisVersion.Version, thisComponent.Description);
        }

        public ComponentInstallationResult InstallNextComponent(int componentId, Version installationVersion)
        {
            var thisVersion = discovery
                .Discover()
                .SingleOrDefault(iv => iv.Version.CompareTo(installationVersion) == 0);

            if (thisVersion == null)
            {
                return ComponentInstallationResult.Fail(componentId, installationVersion, "Installation version not found");
            }
            
            if (!thisVersion.InstallationComponents.ContainsKey(componentId))
            {
                return ComponentInstallationResult.Fail(componentId, installationVersion, 
                    string.Format("Component with id {0} not found in installation version {1}", componentId, installationVersion));
            }

            return this.InstallComponent(componentId, thisVersion);
        }

        public Version GetCurrentVersion()
        {
            var solution = dataAccessDispatcher.Dispatch(SolutionActions.GetSolutionByName(CrmConstants.DefaultSolutionSettings.Name));

            return Version.Parse(solution.Version);
        }

        private ComponentInstallationResult InstallComponent(int componentId, InstallationVersion version)
        {
            var thisComponent = version.InstallationComponents[componentId];
            var nextComponent = GetNextInstallationComponent(version, componentId);

            try
            {
                dataAccessDispatcher.Dispatch(thisComponent.InstallationAction);
                dataAccessDispatcher.Dispatch(thisComponent.DataChangeAction);

                if (!nextComponent.HasValue || (nextComponent.HasValue && nextComponent.Value.Value.Version.CompareTo(version.Version) > 0))
                {
                    /* The next component is part of a newer version, 
                     * so at this point we update the solution to reflect that this
                     * installation version has installed. If the solution update fails,
                     * we should rollback and fail the current component too */
                    try
                    {
                        var solution = dataAccessDispatcher.Dispatch(SolutionActions.GetSolutionByName(CrmConstants.DefaultSolutionSettings.Name));
                        solution.Version = version.Version.ToString();
                        dataAccessDispatcher.Dispatch(SolutionActions.UpdateSolution(solution));
                    }
                    catch
                    {
                        dataAccessDispatcher.Dispatch(thisComponent.RollbackAction);
                        throw;
                    }
                }

                if (nextComponent.HasValue)
                {
                    var nextComponentDescription = nextComponent.Value.Value.InstallationComponents[nextComponent.Value.Key].Description;
                    var nextComponentKey = nextComponent.Value.Key;
                    var nextComponentVersion = nextComponent.Value.Value.Version;

                    return ComponentInstallationResult.Success(componentId, version.Version, nextComponentKey, nextComponentVersion, nextComponentDescription);
                }
                else
                {
                    return ComponentInstallationResult.Success(componentId, version.Version, true);
                }
            }
            catch (Exception ex)
            {
                return ComponentInstallationResult.Fail(componentId, version.Version, ex.Message);
            }
        }

        private InstallationVersion GetNextVersion(Version version)
        {
            return discovery.Discover()
                .Where(iv => iv.Version.CompareTo(version) > 0)
                .OrderBy(x => x.Version)
                .FirstOrDefault();
        }

        private KeyValuePair<int, InstallationVersion>? GetNextInstallationComponent(InstallationVersion version, int componentId)
        {
            if (version.InstallationComponents.ContainsKey(componentId + 1))
            {
                return new KeyValuePair<int, InstallationVersion>(componentId + 1, version);
            }
            else 
            {
                var nextVersion = GetNextVersion(version.Version);

                if (nextVersion != null)
                {
                    return new KeyValuePair<int, InstallationVersion>(0, nextVersion);
                }
            }

            return null;
        }

        public void RollbackInstallationVersion(int failedComponentId, Version failedInstallationVersion)
        {
            var thisVersion = discovery.Discover()
                .SingleOrDefault(iv => iv.Version.CompareTo(failedInstallationVersion) == 0);

            Guard.This(thisVersion, string.Format("Rollback request was received, but version {0} was found on the system", failedInstallationVersion))
                .CustomRule(iv => iv != null);

            failedComponentId--; // The failed component doesn't require rollback. Start with the component installed before the failure
            while (failedComponentId >= 0)
            {
                if (thisVersion.InstallationComponents.ContainsKey(failedComponentId))
                {
                    var rollbackAction = thisVersion.InstallationComponents[failedComponentId].RollbackAction;
                    dataAccessDispatcher.Dispatch(rollbackAction);
                }

                failedComponentId--;
            }
        }
    }
}
