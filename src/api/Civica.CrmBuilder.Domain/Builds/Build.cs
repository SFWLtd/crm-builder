using Civica.CrmBuilder.Domain.Dtos;

namespace Civica.CrmBuilder.Domain.Build
{
    public class Build
    {
        internal Entities.Build Entity;

        internal Build(Entities.Build entity)
        {
            Entity = entity;
        }

        public void UpdateProperties(BuildDto build)
        {
            Entity = build.Map();
        }

        public BuildDto AsDto()
        {
            var dto = new BuildDto();
            dto.PopulateFrom(Entity);

            return dto;
        }
    }
}
