using System;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public class CrmClient : Client, IClient
    {
        public ICrmPlusPlus Crm { get; }

        public CrmClient(CrmConnectionString connectionString)
        {
            try
            {
                Crm = CrmPlusPlus.Sdk.CrmPlusPlus.ForTenant(connectionString.ToString());
            }
            catch (Exception ex)
            {
                throw new UnauthorizedAccessException("Unauthorized", ex);
            }
        }
    }
}
