using System;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public class Dynamics365Client : Client, IClient
    {
        public ICrmPlusPlus Crm { get; }

        public Dynamics365Client(string url, string emailAddress, string password)
        {
            Guard.This(url).AgainstNullOrEmpty();
            Guard.This(emailAddress).AgainstNullOrEmpty();
            Guard.This(password).AgainstNullOrEmpty();

            var connectionString = string.Format("Url={0}; Username={1}; Password={2}; authtype=Office365",
                url,
                emailAddress,
                password);

            try
            {
                Crm = CrmPlusPlus.Sdk.CrmPlusPlus.ForTenant(connectionString);
            }
            catch (Exception ex)
            {
                throw new UnauthorizedAccessException("Unauthorized", ex);
            }
        }
    }
}
