using System;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public abstract class Client
    {
        public DateTime LastAccess { get; private set; }

        public Guid AccessToken { get; set; }

        public Client(Guid? accessToken = null)
        {
            AccessToken = accessToken.HasValue ? accessToken.Value : Guid.NewGuid();
            LastAccess = DateTime.Now;
        }

        public void MarkAsAccessed()
        {
            LastAccess = DateTime.Now;
        }
    }
}
