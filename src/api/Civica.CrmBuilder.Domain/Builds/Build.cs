using System;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class Build : IBuild
    {
        private readonly ICrmPlusPlusEntityClient client;

        public Guid Id { get { return Entity.Id; } }

        internal Entities.Build Entity { get; set; }

        internal Build(ICrmPlusPlusEntityClient client, BuildProperties buildProps)
        {
            this.client = client;

            Guard.This(buildProps.Name).AgainstNullOrEmpty();
            Guard.This(buildProps.VersionMajor).AgainstNegative();
            Guard.This(buildProps.VersionMinor).AgainstNegative();

            Entity = new Entities.Build
            {
                Name = buildProps.Name,
                BuildVersioningType = buildProps.BuildVersioningType,
                VersionMajor = buildProps.VersionMajor,
                VersionMinor = buildProps.VersionMinor
            };

            client.Create(Entity);
        }

        internal Build(ICrmPlusPlusEntityClient client, Guid id)
        {
            this.client = client;

            var retrieval = CrmPlusPlus.Sdk.Client.Retrieve.Retrieval
                .ForEntity<Entities.Build>(id)
                .IncludeAllColumns(true);

            Entity = client.Retrieve(retrieval);
        }

        public void UpdateVersion(int versionMajor, int versionMinor)
        {
            Guard.This(versionMajor).AgainstNegative();
            Guard.This(versionMinor).AgainstNegative();

            Entity.VersionMajor = versionMajor;
            Entity.VersionMinor = versionMinor;

            client.Update(Entity);
        }
    }
}
