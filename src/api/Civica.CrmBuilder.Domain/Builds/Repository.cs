using System.Linq;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Builds
{
    public abstract class Repository<T> where T : CrmPlusPlusEntity, new()
    {
        protected readonly ICrmPlusPlusEntityClient Client;

        protected Repository(ICrmPlusPlusEntityClient client)
        {
            Client = client;
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
