using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Domain.Builds
{
    public interface IBuildRepository
    {
        IBuild New(IMappableTo<BuildProperties> buildProperties);

        IBuild Get(string id);

        IBuild Get(Guid id);

        IEnumerable<BuildProperties> GetAll();

        void Delete(Guid id);

        void Delete(string id);
    }
}
