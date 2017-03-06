using System.Collections.Generic;
using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.DataAccess;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Entities;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class BuildsController : ApiController
    {
        private readonly IDataAccessDispatcher dataAccessDispatcher;

        public BuildsController(IDataAccessDispatcher dataAccessDispatcher)
        {
            this.dataAccessDispatcher = dataAccessDispatcher;
        }

        [ActionName("GetBuild")]
        [HttpGet]
        public GlobalJsonResult<Build> GetBuild(string id)
        {
            var result = dataAccessDispatcher.Dispatch(BuildActions.GetBuild(id));

            return GlobalJsonResult<Build>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("GetBuilds")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<Build>> GetBuilds()
        {
            var result = dataAccessDispatcher.Dispatch(BuildActions.GetAllBuilds());

            return GlobalJsonResult<IEnumerable<Build>>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("NewBuild")]
        [HttpPost]
        public GlobalJsonResult<Build> NewBuild([FromBody]NewBuildRequest request)
        {
            var build = request.Map();
            dataAccessDispatcher.Dispatch(BuildActions.CreateBuild(build));

            return GlobalJsonResult<Build>.Success(System.Net.HttpStatusCode.Created, build);
        }

        [ActionName("UpdateBuild")]
        [HttpPost]
        public GlobalJsonResult<Build> UpdateBuild([FromBody]UpdateBuildRequest request)
        {
            var build = request.Map();
            dataAccessDispatcher.Dispatch(BuildActions.UpdateBuild(build));

            return GlobalJsonResult<Build>.Success(System.Net.HttpStatusCode.OK, build);
        }

        [ActionName("DeleteBuild")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> DeleteBuild([FromBody]DeleteBuildRequest request)
        {
            dataAccessDispatcher.Dispatch(BuildActions.DeleteBuild(request.Id));

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.NoContent);
        }
    }
}