using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmBuilder.Domain.Solutions;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class SolutionsController : ApiController
    {
        private readonly ISolutionRepository solutionRepo;

        public SolutionsController(ISolutionRepository solutionRepo)
        {
            this.solutionRepo = solutionRepo;
        }

        [ActionName("GetAll")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<SolutionDto>> GetAll()
        {
            var solutions = solutionRepo.GetAll();

            var result = solutions.Select(s =>
            {
                var dto = new SolutionDto();
                dto.PopulateFrom(s);
                return dto;
            });

            return GlobalJsonResult<IEnumerable<SolutionDto>>.Success(System.Net.HttpStatusCode.OK, result);
        }
    }
}