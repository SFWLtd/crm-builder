using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class BuildRepository : IBuildRepository
    {
        private readonly ICrmPlusPlusEntityClient entityClient;

        public BuildRepository(IClientStore clientStore)
        {
            entityClient = clientStore.Get().Crm.EntityClient;
        }

        public IDomainComponent<Build.Build> Get(Guid id)
        {
            var retrieval = Retrieval
                .ForEntity<Entities.Build>(id)
                .IncludeAllColumns(true);

            var entity = entityClient.Retrieve(retrieval);

            return new DomainComponent<Build.Build>(
                new Build.Build(entity),
                build => PersistChanges(build.Entity));
        }

        public IDomainComponent<Build.Build> Get(string id)
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

        public IEnumerable<IDomainComponent<Build.Build>> GetAll()
        {
            var query = Query.ForEntity<Entities.Build>()
                .IncludeAllProperties();

            return entityClient
                .RetrieveMultiple(query)
                .OrderByDescending(e => e.CreatedOn)
                .Select(e => new DomainComponent<Build.Build>(
                    new Build.Build(e),
                    build => PersistChanges(build.Entity)));
        }

        public IDomainComponent<Build.Build> New(BuildDto buildProperties)
        {
            var entity = buildProperties.Map();

            return new DomainComponent<Build.Build>(
                new Build.Build(entity),
                build => PersistChanges(build.Entity));
        }

        private void PersistChanges(Entities.Build entity)
        {
            var retrieval = Query.ForEntity<Entities.Build>()
                .Filter(FilterType.And, f =>
                {
                    f.Condition(b => b.Id, ConditionOperator.Equal, entity.Id.ToString());
                });

            var exists = entityClient.RetrieveMultiple(retrieval).Any();

            if (exists)
            {
                entityClient.Update(entity);
            }
            else
            {
                entityClient.Create(entity);
            }
        }
    }
}
