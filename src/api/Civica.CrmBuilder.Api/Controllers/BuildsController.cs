using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Builds;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class BuildsController : ApiController
    {
        private readonly IBuildBuilder buildBuilder;

        public BuildsController(IBuildBuilder buildBuilder)
        {
            this.buildBuilder = buildBuilder;
        }

        [ActionName("NewBuild")]
        [HttpPost]
        public GlobalJsonResult<NewBuildResult> NewBuild([FromBody]NewBuildRequest request)
        {
            var build = buildBuilder.New(request);

            var result = new NewBuildResult();
            result.PopulateFrom(build);

            return GlobalJsonResult<NewBuildResult>.Success(System.Net.HttpStatusCode.Created, result);
        }
    }
}