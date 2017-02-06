using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Builds;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class NewBuildRequest : IMappableTo<NewBuildProperties>
    {
        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public NewBuildProperties Map()
        {
            return new NewBuildProperties
            {
                BuildVersioningType = BuildVersioningType,
                Name = Name
            };
        }
    }
}