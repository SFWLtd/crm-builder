using System;
using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Installation;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class InstallationController : ApiController
    {
        private readonly IClientStore clientStore;

        public InstallationController(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        public GlobalJsonResult<InstallationStatusResult> GetInstallationStatus()
        {
            var installationStatus = Installation.ForClient(clientStore).GetStatus();

            var result = new InstallationStatusResult();
            result.PopulateFrom(installationStatus);

            return GlobalJsonResult<InstallationStatusResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        public GlobalJsonResult<InstallationResult> StartInstallation([FromBody]StartInstallationRequest request)
        {
            var installationResult = Installation.ForClient(clientStore)
                .StartInstallation();

            var result = new InstallationResult();
            result.PopulateFrom(installationResult);

            return result.IsSuccess
                ? GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.Created, result)
                : GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        public GlobalJsonResult<InstallationResult> InstallNextComponent([FromBody]ComponentInstallationRequest request)
        {
            var installationResult = Installation.ForClient(clientStore)
                .InstallNextComponent(request.InstallationComponentId, request.Version);

            var result = new InstallationResult();
            result.PopulateFrom(installationResult);

            return result.IsSuccess
                ? GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.Created, result)
                : GlobalJsonResult<InstallationResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        public GlobalJsonResult<EmptyResult> RollbackComponentsForVersion([FromBody]RollbackRequest request)
        {
            Installation.ForClient(clientStore)
                .RollbackInstallationVersion(request.FailedInstallationComponentId, request.FailedInstallationVersion);

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.NoContent);
        }
    }
}