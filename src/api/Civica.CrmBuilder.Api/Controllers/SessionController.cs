using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.DataAccess.Authentication;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class SessionController : ApiController
    {
        private readonly IClientStore clientStore;

        public SessionController(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        [ActionName("CheckSessionExists")]
        [HttpGet]
        public GlobalJsonResult<bool> CheckSessionExists()
        {
            var result = clientStore.CheckClientExists();

            return GlobalJsonResult<bool>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("NewSession")]
        [HttpPost]
        public GlobalJsonResult<bool> NewSession([FromBody]NewSessionRequest request)
        {
            var client = request.Map();
            clientStore.Set(client);

            return GlobalJsonResult<bool>.Success(System.Net.HttpStatusCode.OK, true);
        }

        [ActionName("EndSession")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> EndSession()
        {
            clientStore.Clear();

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.NoContent);
        }
    }
}
