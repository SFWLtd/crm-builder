using System;
using System.Collections.Generic;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Repository
{
    public interface IDomainComponentRepository<TDomainComponent, TEntity>
        where TDomainComponent: EntityComponent<TEntity>, new()
        where TEntity : CrmPlusPlusEntity, new()
    {
        IDomainComponent New();

        TDomainComponent Get(string id);

        TDomainComponent Get(Guid id);

        IEnumerable<TDomainComponent> GetAll();

        void Delete(Guid id);

        void Delete(string id);
    }
}
