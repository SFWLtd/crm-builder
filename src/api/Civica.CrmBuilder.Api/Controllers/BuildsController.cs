using System.Collections.Generic;
using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Builds;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class BuildsController : ApiController
    {
        private readonly IBuildService buildService;

        public BuildsController(IBuildService buildService)
        {
            this.buildService = buildService;
        }

        [ActionName("GetBuilds")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<BuildProperties>> GetBuilds()
        {
            return GlobalJsonResult<IEnumerable<BuildProperties>>.Success(System.Net.HttpStatusCode.OK, buildService.GetAll());
        }

        [ActionName("NewBuild")]
        [HttpPost]
        public GlobalJsonResult<NewBuildResult> NewBuild([FromBody]NewBuildRequest request)
        {
            var build = buildService.New(request);

            var result = new NewBuildResult();
            result.PopulateFrom(build);

            return GlobalJsonResult<NewBuildResult>.Success(System.Net.HttpStatusCode.Created, result);
        }

        [ActionName("DeleteBuild")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> DeleteBuild([FromBody]DeleteBuildRequest request)
        {
            buildService.Delete(request.Id);

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.NoContent);
        }
    }
}