using System.Collections.Generic;
using Civica.CrmBuilder.Domain.Componentization;

namespace Civica.CrmBuilder.Domain.Solutions
{
    public interface ISolutionRepository
    {
        IEnumerable<IUpdatableDomainComponent<Solution>> GetAll(bool includeManaged = false);
    }
}
