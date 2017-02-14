using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Domain.Componentization;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public interface IBuildRepository
    {
        ICreatableDomainComponent<Builds.Build> New();

        IUpdatableDomainComponent<Builds.Build> Get(string id);

        IUpdatableDomainComponent<Builds.Build> Get(Guid id);

        IEnumerable<IUpdatableDomainComponent<Builds.Build>> GetAll();

        void Delete(Guid id);

        void Delete(string id);
    }
}
