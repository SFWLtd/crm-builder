using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly IClientStore clientStore;

        public AuthenticationController(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        [HttpPost("/Authenticate")]
        public GlobalJsonResult<AuthenticateResult> Authenticate([FromBody]AuthenticateRequest request)
        {
            var client = request.Map();
            clientStore.Add(client);

            return GlobalJsonResult<AuthenticateResult>.Success(System.Net.HttpStatusCode.OK, new AuthenticateResult { Token = client.AccessToken });
        }
    }
}
