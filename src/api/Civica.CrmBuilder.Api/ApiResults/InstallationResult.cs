using System;
using Civica.CrmBuilder.Domain.Installation;
using Civica.CrmBuilder.Domain.Mapping;

namespace Civica.CrmBuilder.Api.ApiResults
{
    public class InstallationResult : IPopulatableFrom<ComponentInstallationResult>
    {
        public int? ComponentId { get; set; }

        public string Version { get; set; }

        public string ComponentDescription { get; set; }

        public bool IsSuccess { get; set; }

        public string ErrorMessage { get; set; }

        public bool MoreToInstall { get; set; }

        public int? NextComponentId { get; set; }

        public string NextComponentVersion { get; set; }

        public void PopulateFrom(ComponentInstallationResult source)
        {
            ComponentId = source.ComponentId;      
            Version = source.Version != null ? source.Version.ToString(): null;
            IsSuccess = source.IsSuccess;
            MoreToInstall = source.MoreToInstall;
            NextComponentId = source.NextComponentId;
            NextComponentVersion = source.NextComponentVersion != null ? source.NextComponentVersion.ToString(): null;
            ComponentDescription = source.ComponentDescription;
            ErrorMessage = source.ErrorMessage;
        }
    }
}