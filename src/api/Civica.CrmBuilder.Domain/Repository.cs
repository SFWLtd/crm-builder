using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain
{
    public abstract class Repository<T> where T : CrmPlusPlusEntity, new()
    {
        protected readonly ICrmPlusPlusEntityClient Client;

        protected Repository(IClientStore clientStore)
        {
            Client = clientStore.Get().Crm.EntityClient;
        }

        protected void Create(T entity)
        {
            Client.Create(entity);
        }

        protected void Update(T entity)
        {
            Client.Update(entity);
        }
    }
}
