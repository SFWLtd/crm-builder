using System;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public interface IBuild
    {
        void DoThis(Action<Build.Build> action);

        BuildDto AsDto();
    }
}
