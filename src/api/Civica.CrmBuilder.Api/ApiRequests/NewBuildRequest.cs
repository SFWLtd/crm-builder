using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Builds;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class NewBuildRequest : IMappableTo<BuildProperties>
    {
        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public int VersionMajor { get; set; }

        public int VersionMinor { get; set; }

        public BuildProperties Map()
        {
            return new BuildProperties
            {
                BuildVersioningType = BuildVersioningType,
                Name = Name,
                VersionMajor = VersionMajor,
                VersionMinor = VersionMinor
            };
        }
    }
}