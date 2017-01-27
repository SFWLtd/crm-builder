using System;

namespace Civica.CrmBuilder.Domain.Installation
{
    public class ComponentInstallationResult
    {
        public int? ComponentId { get; private set; }

        public string ComponentDescription { get; private set; }

        public Version Version { get; private set; }

        public bool IsSuccess { get; private set; }

        public string ErrorMessage { get; private set; }

        public bool MoreToInstall { get; private set; }

        public int? NextComponentId { get; private set; }

        public Version NextComponentVersion { get; private set; }

        private ComponentInstallationResult(int? componentId, string componentDescription, bool success, Version version, bool moreToInstall, int? nextComponentId = null, Version nextComponentVersion = null, string errorMessage = null)
        {
            ComponentId = componentId;
            ComponentDescription = componentDescription;
            Version = version;
            IsSuccess = success;
            MoreToInstall = moreToInstall;
            NextComponentId = nextComponentId;
            NextComponentVersion = nextComponentVersion;
            ErrorMessage = errorMessage;
        }

        public static ComponentInstallationResult Success(int componentId, string componentDescription, Version version, bool success)
        {
            return new ComponentInstallationResult(componentId, componentDescription, success, version, false);
        }

        public static ComponentInstallationResult Success(Version version)
        {
            return new ComponentInstallationResult(null, null, true, version, false);
        } 

        public static ComponentInstallationResult Success(int componentId, string componentDescription, Version version, bool moreToInstall, int nextComponentId, Version nextComponentVersion)
        {
            return new ComponentInstallationResult(componentId, componentDescription, true, version, moreToInstall, nextComponentId, nextComponentVersion);
        }

        public static ComponentInstallationResult Fail(int componentId, string componentDescription, Version version, string errorMessage)
        {
            return new ComponentInstallationResult(componentId, componentDescription, false, version, false, errorMessage: errorMessage);
        }
    }
}
