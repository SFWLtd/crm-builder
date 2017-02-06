using System;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Domain.Builds
{
    public interface IBuildBuilder
    {
        IBuild New(IMappableTo<NewBuildProperties> buildProperties);

        IBuild Existing(Guid id);
    }
}
