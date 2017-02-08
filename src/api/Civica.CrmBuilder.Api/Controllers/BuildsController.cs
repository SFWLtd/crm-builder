using System.Collections.Generic;
using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Builds;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class BuildsController : ApiController
    {
        private readonly IBuildRepository buildRepo;

        public BuildsController(IBuildRepository buildRepo)
        {
            this.buildRepo = buildRepo;
        }

        [ActionName("GetBuilds")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<BuildProperties>> GetBuilds()
        {
            return GlobalJsonResult<IEnumerable<BuildProperties>>.Success(System.Net.HttpStatusCode.OK, buildRepo.GetAll());
        }

        [ActionName("NewBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildResult> NewBuild([FromBody]NewBuildRequest request)
        {
            var build = buildRepo.New(request);

            var result = new BuildResult();
            result.PopulateFrom(build);

            return GlobalJsonResult<BuildResult>.Success(System.Net.HttpStatusCode.Created, result);
        }

        [ActionName("UpdateBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildResult> UpdateBuild([FromBody]UpdateBuildRequest request)
        {
            var build = buildRepo.Get(request.Id);

            build.DoThis(b => b.Update(request));

            var result = new BuildResult();
            result.PopulateFrom(build);

            return GlobalJsonResult<BuildResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("DeleteBuild")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> DeleteBuild([FromBody]DeleteBuildRequest request)
        {
            buildRepo.Delete(request.Id);

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.NoContent);
        }
    }
}