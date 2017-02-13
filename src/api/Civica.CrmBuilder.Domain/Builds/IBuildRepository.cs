using System;
using System.Collections.Generic;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public interface IBuildRepository
    {
        IDomainComponent<Build.Build> New(BuildDto build);

        IDomainComponent<Build.Build> Get(string id);

        IDomainComponent<Build.Build> Get(Guid id);

        IEnumerable<IDomainComponent<Build.Build>> GetAll();

        void Delete(Guid id);

        void Delete(string id);
    }
}
