using System;

namespace Civica.CrmBuilder.Domain.Installation
{
    public class ComponentInstallationResult
    {
        public int? ComponentId { get; private set; }

        public Version Version { get; private set; }

        public bool IsSuccess { get; private set; }

        public string ErrorMessage { get; private set; }

        public bool MoreToInstall { get; private set; }

        public int? NextComponentId { get; private set; }

        public Version NextComponentVersion { get; private set; }

        public string NextComponentDescription { get; private set; }

        private ComponentInstallationResult(int? componentId, bool success, Version version, bool moreToInstall, int? nextComponentId = null, Version nextComponentVersion = null, string nextComponentDescription = null, string errorMessage = null)
        {
            ComponentId = componentId;
            NextComponentDescription = nextComponentDescription;
            Version = version;
            IsSuccess = success;
            MoreToInstall = moreToInstall;
            NextComponentId = nextComponentId;
            NextComponentVersion = nextComponentVersion;
            ErrorMessage = errorMessage;
        }

        public static ComponentInstallationResult Success(int componentId, Version version, bool success)
        {
            return new ComponentInstallationResult(componentId, success, version, false);
        }

        public static ComponentInstallationResult Success(Version version)
        {
            return new ComponentInstallationResult(null, true, version, false);
        } 

        public static ComponentInstallationResult Success(int? componentId, Version version, int nextComponentId, Version nextComponentVersion, string nextComponentDescription)
        {
            return new ComponentInstallationResult(componentId, true, version, true, nextComponentId, nextComponentVersion, nextComponentDescription);
        }

        public static ComponentInstallationResult Fail(int componentId, Version version, string errorMessage)
        {
            return new ComponentInstallationResult(componentId, false, version, false, errorMessage: errorMessage);
        }
    }
}
