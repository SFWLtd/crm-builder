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
            var build = buildRepo.Get(id);

            var result = new BuildDto();
            result.PopulateFrom(build);

            return GlobalJsonResult<BuildDto>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("GetBuilds")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<BuildDto>> GetBuilds()
        {
            var builds = buildRepo.GetAll()
                .Select(b =>
                {
                    var result = new BuildDto();
                    result.PopulateFrom(b);

                    return result;
                });

            return GlobalJsonResult<IEnumerable<BuildDto>>.Success(System.Net.HttpStatusCode.OK, builds);
        }

        [ActionName("NewBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildDto> NewBuild([FromBody]NewBuildRequest request)
        {
            var build = buildRepo.New();
            build.CreateAs(a =>
            {
                a.SetName(request.Name);
                a.SetBuildVersioningType(request.BuildVersioningType);
                a.SetVersion(request.VersionMajor, request.VersionMinor);
                a.SetSolution(request.SolutionId);
                a.SetTargetEnvironment(request.Map());
            });

            var result = new BuildDto();
            result.PopulateFrom(build);

            return GlobalJsonResult<BuildDto>.Success(System.Net.HttpStatusCode.Created, result);
        }

        [ActionName("UpdateBuild")]
        [HttpPost]
        public GlobalJsonResult<BuildDto> UpdateBuild([FromBody]UpdateBuildRequest request)
        {
            var build = buildRepo.Get(request.Id);
            build.DoThis(a =>
            {
                a.SetName(request.Name);
                a.SetBuildVersioningType(request.BuildVersioningType);
                a.SetVersion(request.VersionMajor, request.VersionMinor);
                a.SetSolution(request.SolutionId);
                a.SetTargetEnvironment(request.Map());
            });

            var result = new BuildDto();
            result.PopulateFrom(build);

            return GlobalJsonResult<BuildDto>.Success(System.Net.HttpStatusCode.OK, result);
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