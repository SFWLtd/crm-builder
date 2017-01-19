using System.Web.Http;
using Civica.CrmBuilder.Domain.Authentication;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class ValuesController : ApiController
    {
        private readonly IClientStore clientStore;

        public ValuesController(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        [HttpGet]
        public int[] Get()
        {
            return new int[] { 1, 2 };
        }
    }
}