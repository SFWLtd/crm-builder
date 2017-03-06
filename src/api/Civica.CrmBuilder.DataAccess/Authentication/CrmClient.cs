using System;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.DataAccess.Authentication
{
    public class CrmClient : Client
    {
        internal ICrmPlusPlus Crm { get; }

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
