using System;
using Civica.CrmBuilder.Domain.Time;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public class InMemoryClientStore : IClientStore
    {
        private IClient client;
        private readonly TimeSpan slidingExpiryPeriod;

        public InMemoryClientStore(int slidingExpiryPeriodInMinutes = 15)
        {
            client = null;
            slidingExpiryPeriod = TimeSpan.FromMinutes(slidingExpiryPeriodInMinutes);
        }

        public void Set(IClient client)
        {
            client.MarkAsAccessed();
            this.client = client;
        }

        public IClient Get()
        {
            if (client == null || SystemTime.Now.Subtract(client.LastAccess).CompareTo(slidingExpiryPeriod) > 0)
            {
                throw new UnauthorizedAccessException("No client was found");
            }

            client.MarkAsAccessed();
            return client;
        }

        public void Clear()
        {
            client = null;
        }
    }
}
