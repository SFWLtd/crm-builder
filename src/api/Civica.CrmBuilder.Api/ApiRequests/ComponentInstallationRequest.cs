using System;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class ComponentInstallationRequest
    {
        public int InstallationComponentId { get; set; }

        public string Version { get; set; }
    }
}