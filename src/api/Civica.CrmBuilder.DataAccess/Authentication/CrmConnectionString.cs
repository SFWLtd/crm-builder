using Civica.CrmBuilder.Core.Validation;

namespace Civica.CrmBuilder.DataAccess.Authentication
{
    public class CrmConnectionString
    {
        private readonly string value;

        public CrmConnectionString(string crmUrl, string email, string password)
        {
            Guard.This(crmUrl).AgainstNullOrEmpty();
            Guard.This(email).AgainstNullOrEmpty();
            Guard.This(password).AgainstNullOrEmpty();

            value = string.Format("Url={0}; Username={1}; Password={2}; authtype=Office365",
                crmUrl,
                email,
                password);
        }

        public CrmConnectionString(string crmUrl, string domain, string username, string password)
        {
            Guard.This(crmUrl).AgainstNullOrEmpty();
            Guard.This(domain).AgainstNullOrEmpty();
            Guard.This(username).AgainstNullOrEmpty();
            Guard.This(password).AgainstNullOrEmpty();

            value =  string.Format("AuthType=AD;Url={0}; Domain={1}; Username={2}; Password={3}",
                crmUrl,
                domain,
                username,
                password);
        }

        public override string ToString()
        {
            return value;
        }
    }
}
