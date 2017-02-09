using System;
using System.Collections.Generic;
using System.Linq;
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

        [ActionName("GetBuild")]
        [HttpGet]
        public GlobalJsonResult<BuildDto> GetBuild(string id)
        {
            var result = buildRepo
                .Get(id)
                .AsDto();

            return GlobalJsonResult<BuildDto>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("GetBuilds")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<BuildDto>> GetBuilds()
        {
            var builds = buildRepo
                .GetAll()
                .Select(b => b.AsDto());

            return GlobalJsonResult<IEnumerable<BuildDto>>.Success(System.Net.HttpStatusCode.OK, builds);
        }

        [ActionName("NewBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildDto> NewBuild([FromBody]BuildDto request)
        {
            var build = buildRepo.New(request);

            return GlobalJsonResult<BuildDto>.Success(System.Net.HttpStatusCode.Created, build.AsDto());
        }

        [ActionName("UpdateBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildDto> UpdateBuild([FromBody]BuildDto request)
        {
            var build = buildRepo.Get(request.Id);
            build.DoThis(b => b.UpdateProperties(request));

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