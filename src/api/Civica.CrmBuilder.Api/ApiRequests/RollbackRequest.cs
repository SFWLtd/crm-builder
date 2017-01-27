namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class RollbackRequest
    {
        public int FailedInstallationComponentId { get; set; }

        public string FailedInstallationVersion { get; set; }
    }
}