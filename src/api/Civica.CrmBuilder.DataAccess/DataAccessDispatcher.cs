using System;
using Civica.CrmBuilder.DataAccess.Authentication;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.DataAccess
{
    public class DataAccessDispatcher
    {
        private readonly IClientStore clientStore;

        public DataAccessDispatcher(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        public void Dispatch(DataAccessAction dataAccessAction)
        {
            var client = GetCrmClient();

            dataAccessAction.Action(client);
        }

        public T Dispatch<T>(DataAccessAction<T> dataAccessAction)
        {
            var client = GetCrmClient();

            return dataAccessAction.Action(client);
        }

        private ICrmPlusPlus GetCrmClient()
        {
            var client = clientStore.Get() as CrmClient;
            if (client == null)
            {
                throw new InvalidOperationException("Could not access CRM Client.");
            }

            return client.Crm;
        }
    }
}
