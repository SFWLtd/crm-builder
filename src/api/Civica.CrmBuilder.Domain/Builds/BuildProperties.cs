using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class BuildProperties : IPopulatableFrom<Entities.Build>
    {
        public string Id { get; internal set; }

        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public int VersionMajor { get; set; }

        public int VersionMinor { get; set; }

        public void PopulateFrom(Entities.Build source)
        {
            Id = source.Id.ToString();
            Name = source.Name;
            BuildVersioningType = source.BuildVersioningType;
            VersionMajor = source.VersionMajor;
            VersionMinor = source.VersionMinor;
        }
    }
}
