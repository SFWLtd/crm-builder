using System;

namespace Civica.CrmBuilder.Domain.Versioning
{
    public interface IVersionable
    {
        Version Version { get; }
    }
}
