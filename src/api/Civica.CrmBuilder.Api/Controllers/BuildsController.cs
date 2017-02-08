using System.Collections.Generic;
using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Domain.Dtos;

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
        public GlobalJsonResult<IEnumerable<BuildDto>> GetBuilds()
        {
            return GlobalJsonResult<IEnumerable<BuildDto>>.Success(System.Net.HttpStatusCode.OK, buildRepo.GetAll());
        }

        [ActionName("NewBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildDto> NewBuild([FromBody]NewBuildRequest request)
        {
            var build = buildRepo.New(request);

            return GlobalJsonResult<BuildDto>.Success(System.Net.HttpStatusCode.Created, build.AsDto());
        }

        [ActionName("UpdateBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildDto> UpdateBuild([FromBody]UpdateBuildRequest request)
        {
            var build = buildRepo.Get(request.Id);
            build.DoThis(b => b.Update(request));

            return GlobalJsonResult<BuildDto>.Success(System.Net.HttpStatusCode.OK, build.AsDto());
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