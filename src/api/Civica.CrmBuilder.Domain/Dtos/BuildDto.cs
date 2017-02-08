using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class BuildDto : IMappableTo<Entities.Build>, IPopulatableFrom<Entities.Build>
    {
        public string Id { get; set; }

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

        public Entities.Build Map()
        {
            var id = string.IsNullOrEmpty(Id)
                ? Guid.NewGuid()
                : Guid.Parse(Id);

            return new Entities.Build(id)
            {
                Name = Name,
                BuildVersioningType = BuildVersioningType,
                VersionMajor = VersionMajor,
                VersionMinor = VersionMinor
            };
        }
    }
}
