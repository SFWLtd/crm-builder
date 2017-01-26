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
        public GlobalJsonResult<InstallationResult> InstallNextComponent([FromBody]InstallationRequest request)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public GlobalJsonResult<RollbackResult> RollbackNextComponent([FromBody]RollbackRequest request)
        {
            throw new NotImplementedException();
        }
    }
}