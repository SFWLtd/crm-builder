using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Authentication;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class AuthenticationController : ApiController
    {
        private readonly IClientStore clientStore;

        public AuthenticationController(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        [HttpPost()]
        public GlobalJsonResult<AuthenticateResult> Authenticate([FromBody]AuthenticateRequest request)
        {
            var client = request.Map();
            clientStore.Add(client);

            return GlobalJsonResult<AuthenticateResult>.Success(System.Net.HttpStatusCode.OK, new AuthenticateResult { Token = client.AccessToken });
        }
    }
}
