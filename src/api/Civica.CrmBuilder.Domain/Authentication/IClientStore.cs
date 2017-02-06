using System;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public interface IClientStore
    {
        void Set(IClient client);

        IClient Get();

        void Clear();
    }
}
