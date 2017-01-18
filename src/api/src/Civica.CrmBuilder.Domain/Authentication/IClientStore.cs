using System;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public interface IClientStore
    {
        void Add(IClient client);

        IClient FindByAccessToken(Guid accessToken);
    }
}
