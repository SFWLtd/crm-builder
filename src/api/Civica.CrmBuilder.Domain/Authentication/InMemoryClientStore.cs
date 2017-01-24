using System;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public class InMemoryClientStore : IClientStore
    {
        private IClient client;
        private readonly TimeSpan slidingExpiryPeriod;

        public InMemoryClientStore()
        {
            int slidingExpiryPeriodInMinutes = 15;

            client = null;
            slidingExpiryPeriod = TimeSpan.FromMinutes(slidingExpiryPeriodInMinutes);
        }

        public void Set(IClient client)
        {
            this.client = client;
        }

        public IClient Get()
        {
            if (client == null || DateTime.Now.Subtract(client.LastAccess).CompareTo(slidingExpiryPeriod) > 0)
            {
                throw new InvalidOperationException("No client was found");
            }

            client.MarkAsAccessed();
            return client;
        }
    }
}
