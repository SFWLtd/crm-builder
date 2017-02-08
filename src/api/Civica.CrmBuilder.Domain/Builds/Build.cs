using System;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class Build : IBuild
    {
        private readonly ICrmPlusPlusEntityClient client;
        private readonly Entities.Build entity;

        internal Build(ICrmPlusPlusEntityClient client, BuildDto buildDto)
        {
            this.client = client;
            entity = buildDto.Map();

            this.client.Create(entity);
        }

        internal Build(ICrmPlusPlusEntityClient client, Guid id)
        {
            this.client = client;

            var retrieval = CrmPlusPlus.Sdk.Client.Retrieve.Retrieval
                .ForEntity<Entities.Build>(id)
                .IncludeAllColumns(true);

            entity = client.Retrieve(retrieval);
        }

        public void Update(IMappableTo<BuildDto> props)
        {
            var buildProps = props.Map();

            entity.Name = buildProps.Name;
            entity.VersionMajor = buildProps.VersionMajor;
            entity.VersionMinor = buildProps.VersionMinor;
        }

        public void DoThis(Action<Build> buildActions)
        {
            buildActions(this);
            client.Update(entity);
        }

        public BuildDto AsDto()
        {
            var dto = new BuildDto();
            dto.PopulateFrom(this.entity);

            return dto;
        }
    }
}
