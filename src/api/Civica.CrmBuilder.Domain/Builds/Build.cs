using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class Build : IBuild
    {
        public Guid Id { get { return Entity.Id; } }

        internal Entities.Build Entity { get; set; }

        internal Build(ICrmPlusPlusEntityClient client, BuildProperties buildProps)
        {
            Guard.This(buildProps.Name).AgainstNullOrEmpty();

            Entity = new Entities.Build
            {
                Name = buildProps.Name,
                BuildVersioningType = buildProps.BuildVersioningType
            };

            client.Create(Entity);
        }

        internal Build(ICrmPlusPlusEntityClient client, Guid id)
        {
            var retrieval = CrmPlusPlus.Sdk.Client.Retrieve.Retrieval
                .ForEntity<Entities.Build>(id)
                .IncludeAllColumns(true);

            Entity = client.Retrieve(retrieval);
        }
    }
}
