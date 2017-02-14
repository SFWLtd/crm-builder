using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Domain.Componentization;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public interface IBuildRepository
    {
        ICreatableDomainComponent<Build.Build> New();

        IUpdatableDomainComponent<Build.Build> Get(string id);

        IUpdatableDomainComponent<Build.Build> Get(Guid id);

        IEnumerable<IUpdatableDomainComponent<Build.Build>> GetAll();

        void Delete(Guid id);

        void Delete(string id);
    }
}
