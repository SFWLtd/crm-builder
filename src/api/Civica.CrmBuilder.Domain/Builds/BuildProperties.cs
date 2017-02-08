using Civica.CrmBuilder.Core.Enums;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class BuildProperties
    {
        public string Id { get; internal set; }

        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public int VersionMajor { get; set; }

        public int VersionMinor { get; set; }
    }
}
