using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Componentization;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class BuildRepository : Repository<Entities.Build>, IBuildRepository
    {
        public BuildRepository(IClientStore clientStore)
            : base(clientStore.Get().Crm.EntityClient)
        {
        }

        public IUpdatableDomainComponent<Build.Build> Get(Guid id)
        {
            var retrieval = Retrieval
                .ForEntity<Entities.Build>(id)
                .IncludeAllColumns(true);

            var entity = Client.Retrieve(retrieval);

            return new UpdatableDomainComponent<Build.Build>(
                new Build.Build(entity),
                build => Update(build.Entity));
        }

        public IUpdatableDomainComponent<Build.Build> Get(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            return Get(Guid.Parse(id));
        }

        public void Delete(Guid id)
        {
            var retrieval = Retrieval.ForEntity<Entities.Build>(id);
            var build = Client.Retrieve(retrieval);

            Client.Delete(build);
        }

        public void Delete(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            Delete(Guid.Parse(id));
        }

        public IEnumerable<IUpdatableDomainComponent<Build.Build>> GetAll()
        {
            var query = Query.ForEntity<Entities.Build>()
                .IncludeAllProperties();

            return Client
                .RetrieveMultiple(query)
                .OrderByDescending(e => e.CreatedOn)
                .Select(e => new UpdatableDomainComponent<Build.Build>(
                    new Build.Build(e),
                    build => Update(build.Entity)));
        }

        public ICreatableDomainComponent<Build.Build> New()
        {
            var entity = new Entities.Build();

            return new CreatableDomainComponent<Build.Build>(
                new Build.Build(entity),
                build => Create(build.Entity));
        }
    }
}
