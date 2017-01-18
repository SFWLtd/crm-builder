using System;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public class IfdClient : Client, IClient
    {
        public ICrmPlusPlus Crm { get; }

        public IfdClient(string url, string domain, string username, string password)
        {
            Guard.This(url).AgainstNullOrEmpty();
            Guard.This(domain).AgainstNullOrEmpty();
            Guard.This(username).AgainstNullOrEmpty();
            Guard.This(password).AgainstNullOrEmpty();

            var connectionString = string.Format("AuthType=AD;Url={0}; Domain={1}; Username={2}; Password={3}",
                url,
                domain,
                username,
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
