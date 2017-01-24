using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Authentication;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class SessionController : ApiController
    {
        private readonly IClientStore clientStore;

        public SessionController(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        [HttpGet()]
        public GlobalJsonResult<SessionTokenResult> GetSessionToken([FromBody]GetSessionTokenRequest request)
        {
            var token = clientStore.Get().AccessToken;

            return GlobalJsonResult<SessionTokenResult>.Success(System.Net.HttpStatusCode.OK, new SessionTokenResult { Token = token });
        }

        [HttpPost()]
        public GlobalJsonResult<SessionTokenResult> NewSession([FromBody]NewSessionRequest request)
        {
            var client = request.Map();
            clientStore.Set(client);

            return GlobalJsonResult<SessionTokenResult>.Success(System.Net.HttpStatusCode.OK, new SessionTokenResult { Token = client.AccessToken });
        }
    }
}
