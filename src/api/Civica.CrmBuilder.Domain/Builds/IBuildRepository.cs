using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public interface IBuildRepository
    {
        IBuild New(IMappableTo<BuildDto> buildProperties);

        IBuild Get(string id);

        IBuild Get(Guid id);

        IEnumerable<BuildDto> GetAll();

        void Delete(Guid id);

        void Delete(string id);
    }
}
