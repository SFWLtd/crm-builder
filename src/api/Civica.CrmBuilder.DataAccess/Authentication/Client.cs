using System;

namespace Civica.CrmBuilder.DataAccess.Authentication
{
    public abstract class Client : IClient
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
