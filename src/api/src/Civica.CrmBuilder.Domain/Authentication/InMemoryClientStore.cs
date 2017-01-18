using System;
using System.Collections.Generic;
using System.Linq;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public class InMemoryClientStore : IClientStore
    {
        private readonly IList<IClient> userList;
        private readonly TimeSpan slidingExpiryPeriod;

        public InMemoryClientStore(int slidingExpiryPeriodInMinutes = 15)
        {
            userList = new List<IClient>();
            slidingExpiryPeriod = TimeSpan.FromMinutes(slidingExpiryPeriodInMinutes);
        }

        public void Add(IClient client)
        {
            this.ClearExpiredClients();

            if (!userList.Any(c => c.AccessToken == client.AccessToken))
            {
                client.MarkAsAccessed();
                userList.Add(client);
            }
        }

        public IClient FindByAccessToken(Guid accessToken)
        {
            this.ClearExpiredClients();

            var client = userList.SingleOrDefault(c => c.AccessToken == accessToken);

            if (client == null)
            {
                throw new UnauthorizedAccessException("Unauthorized");
            }

            client.MarkAsAccessed();

            return client;
        }

        private void ClearExpiredClients()
        {
            var expiredClients = new List<IClient>(userList
                .Where(c => DateTime.Now.Subtract(c.LastAccess).CompareTo(slidingExpiryPeriod) > 0));

            foreach (var expiredClient in expiredClients)
            {
                this.Delete(expiredClient);
            }
        }

        private void Delete(IClient user)
        {
            var target = userList.SingleOrDefault(c => c.AccessToken == user.AccessToken);

            if (target != null)
            {
                userList.Remove(target);
            }
        }
    }
}
