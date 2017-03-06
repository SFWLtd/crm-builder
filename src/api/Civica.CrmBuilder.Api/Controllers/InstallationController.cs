using System;
using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Services.Installation;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class InstallationController : ApiController
    {
        private readonly IInstallationService installation;

        public InstallationController(IInstallationService installation)
        {
            this.installation = installation;
        }

        [ActionName("GetInstallationStatus")]
        [HttpGet]
        public GlobalJsonResult<InstallationStatusResult> GetInstallationStatus()
        {
            var installationStatus = installation.GetStatus();

            var result = new InstallationStatusResult();
            result.PopulateFrom(installationStatus);

            return GlobalJsonResult<InstallationStatusResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("StartInstallation")]
        [HttpPost]
        public GlobalJsonResult<InstallationResult> StartInstallation([FromBody]StartInstallationRequest request)
        {
            var installationResult = installation.StartInstallation();

            var result = new InstallationResult();
            result.PopulateFrom(installationResult);

            return result.IsSuccess
                ? GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.Created, result)
                : GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("InstallNextComponent")]
        [HttpPost]
        public GlobalJsonResult<InstallationResult> InstallNextComponent([FromBody]ComponentInstallationRequest request)
        {
            var installationResult = installation.InstallNextComponent(request.InstallationComponentId, Version.Parse(request.Version));

            var result = new InstallationResult();
            result.PopulateFrom(installationResult);

            return result.IsSuccess
                ? GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.Created, result)
                : GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("RollbackComponentsForVersion")]
        [HttpPost]
        public GlobalJsonResult<RollbackResult> RollbackComponentsForVersion([FromBody]RollbackRequest request)
        {
            installation.RollbackInstallationVersion(request.FailedInstallationComponentId, Version.Parse(request.FailedInstallationVersion));
            var version = installation.GetCurrentVersion();

            var result = new RollbackResult();
            result.PopulateFrom(version);

            return GlobalJsonResult<RollbackResult>.Success(System.Net.HttpStatusCode.NoContent, result);
        }
    }
}