using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Dtos;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class NewBuildRequest : IMappableTo<BuildDto>
    {
        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public int VersionMajor { get; set; }

        public int VersionMinor { get; set; }

        public BuildDto Map()
        {
            return new BuildDto
            {
                BuildVersioningType = BuildVersioningType,
                Name = Name,
                VersionMajor = VersionMajor,
                VersionMinor = VersionMinor
            };
        }
    }
}