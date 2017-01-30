using System;
using Civica.CrmBuilder.Domain.Installation;
using Civica.CrmBuilder.Domain.Mapping;

namespace Civica.CrmBuilder.Api.ApiResults
{
    public class InstallationStatusResult : IPopulatableFrom<InstallationStatus>
    {
        public bool IsInstalled { get; set; }

        public bool RequiresUpdate { get; set; }

        public string CurrentVersion { get; set; }

        public void PopulateFrom(InstallationStatus source)
        {
            IsInstalled = source.IsInstalled;
            RequiresUpdate = source.RequiresUpdate;
            CurrentVersion = source.CurrentVersion.ToString();
        }
    }
}