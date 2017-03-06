using System;

namespace Civica.CrmBuilder.Services.Versioning
{
    public interface IVersionable
    {
        Version Version { get; }
    }
}
