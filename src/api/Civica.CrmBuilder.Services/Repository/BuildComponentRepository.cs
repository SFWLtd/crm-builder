using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Builds;

namespace Civica.CrmBuilder.Domain.Repository
{
    public class BuildComponentRepository : DomainComponentRepository<Build, Entities.Build>, IBuildComponentRepository
    {
        public BuildComponentRepository(IClientStore clientStore)
            : base(clientStore)
        {
        }
    }
}
