using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Repository
{
    public abstract class DomainComponentRepository<TDomainComponent, TEntity> : IDomainComponentRepository<TDomainComponent, TEntity>
        where TDomainComponent : EntityComponent<TEntity>, new()
        where TEntity : CrmPlusPlusEntity, new()
    {
        protected readonly ICrmPlusPlusEntityClient Client;

        public DomainComponentRepository(IClientStore clientStore)
        {
            Client = clientStore.Get().Crm.EntityClient;
        }

        public virtual TDomainComponent New()
        {
            var domainComponent = Activator.CreateInstance<TDomainComponent>();
            domainComponent.Entity = Activator.CreateInstance<TEntity>();

            return domainComponent;
        }

        public virtual TDomainComponent Get(string id, Retrieval<TEntity> retrieval = null)
        {
            Guard.This(id).AgainstNonGuidFormat();

            return Get(Guid.Parse(id));
        }

        public virtual TDomainComponent Get(Guid id, Retrieval<TEntity> retrieval = null)
        {
            if (retrieval == null)
            {
                retrieval = Retrieval
                .ForEntity<TEntity>(id)
                .IncludeAllColumns(true);
            }

            var entity = Client.Retrieve(retrieval);
            var domainComponent = Activator.CreateInstance<TDomainComponent>();
            domainComponent.Entity = entity;

            return domainComponent;
        }

        public virtual IEnumerable<TDomainComponent> GetAll(Query<TEntity> query = null)
        {
            if (query == null)
            {
                query = Query.ForEntity<TEntity>()
                .IncludeAllProperties();
            }

            return Client
                .RetrieveMultiple(query)
                .Select(e =>
                {
                    var domainComponent = Activator.CreateInstance<TDomainComponent>();
                    domainComponent.Entity = e;
                    return domainComponent;
                });
        }

        public virtual void Delete(Guid id)
        {
            var retrieval = Retrieval.ForEntity<TEntity>(id);
            var entity = Client.Retrieve(retrieval);

            Client.Delete(entity);
        }

        public virtual void Delete(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            Delete(Guid.Parse(id));
        }
    }
}
