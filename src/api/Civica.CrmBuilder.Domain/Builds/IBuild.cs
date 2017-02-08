using System;

namespace Civica.CrmBuilder.Domain.Builds
{
    public interface IBuild
    {
        Guid Id { get; }

        void UpdateVersion(int versionMajor, int versionMinor);
    }
}
