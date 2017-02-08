using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class BuildRepository : IBuildRepository
    {
        private readonly ICrmPlusPlusEntityClient entityClient;

        public BuildRepository(IClientStore clientStore)
        {
            entityClient = clientStore.Get().Crm.EntityClient;
        }

        public IBuild Get(Guid id)
        {
            return new Build(entityClient, id);
        }

        public IBuild Get(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            return Get(Guid.Parse(id));
        }

        public void Delete(Guid id)
        {
            var retrieval = Retrieval.ForEntity<Entities.Build>(id);
            var build = entityClient.Retrieve(retrieval);

            entityClient.Delete(build);
        }

        public void Delete(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            Delete(Guid.Parse(id));
        }

        public IEnumerable<IBuild> GetAll()
        {
            var query = Query.ForEntity<Entities.Build>()
                .Include(b => b.Name)
                .Include(b => b.BuildVersioningType)
                .Include(b => b.VersionMajor)
                .Include(b => b.VersionMinor);

            return entityClient
                .RetrieveMultiple(query)
                .OrderByDescending(e => e.CreatedOn)
                .Select(b => new Build(entityClient, b));
        }

        public IBuild New(BuildDto buildProperties)
        {
            var entity = buildProperties.Map();
            entityClient.Create(entity);

            return new Build(entityClient, entity);
        }
    }
}
