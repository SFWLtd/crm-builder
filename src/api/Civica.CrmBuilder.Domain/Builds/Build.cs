using System;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class Build : IBuild
    {
        private readonly ICrmPlusPlusEntityClient client;
        private Entities.Build entity;

        internal Build(ICrmPlusPlusEntityClient client, Entities.Build entity)
        {
            this.client = client;
            this.entity = entity;
        }

        internal Build(ICrmPlusPlusEntityClient client, Guid id)
        {
            this.client = client;

            var retrieval = CrmPlusPlus.Sdk.Client.Retrieve.Retrieval
                .ForEntity<Entities.Build>(id)
                .IncludeAllColumns(true);

            entity = client.Retrieve(retrieval);
        }

        public void UpdateProperties(BuildDto build)
        {
            Guard.This(build.Id)
                .AgainstNonGuidFormat();

            Guard.This(Guid.Parse(build.Id))
                .AgainstNotEqual(entity.Id);

            entity = build.Map();
        }

        public void DoThis(Action<Build> action)
        {
            action(this);
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
