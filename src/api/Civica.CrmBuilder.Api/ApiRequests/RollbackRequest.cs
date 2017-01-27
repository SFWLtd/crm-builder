using System;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class RollbackRequest
    {
        public int FailedInstallationComponentId { get; set; }

        public Version FailedInstallationVersion { get; set; }
    }
}