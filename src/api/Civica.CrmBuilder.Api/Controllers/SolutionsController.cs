using System.Collections.Generic;
using System.Web.Http;
using Civica.CrmBuilder.DataAccess;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Entities;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class SolutionsController : ApiController
    {
        private readonly IDataAccessDispatcher dataAccessDispatcher;

        public SolutionsController(IDataAccessDispatcher dataAccessDispatcher)
        {
            this.dataAccessDispatcher = dataAccessDispatcher;
        }

        [ActionName("GetAll")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<Solution>> GetAll()
        {
            var result = dataAccessDispatcher.Dispatch(SolutionActions.GetAll());

            return GlobalJsonResult<IEnumerable<Solution>>.Success(System.Net.HttpStatusCode.OK, result);
        }
    }
}