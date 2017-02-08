using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public interface IBuildRepository
    {
        IBuild New(BuildDto build);

        IBuild Get(string id);

        IBuild Get(Guid id);

        IEnumerable<IBuild> GetAll();

        void Delete(Guid id);

        void Delete(string id);
    }
}
