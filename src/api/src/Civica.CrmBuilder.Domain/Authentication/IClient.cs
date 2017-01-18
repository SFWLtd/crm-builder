using System;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public interface IClient 
    {
        ICrmPlusPlus Crm { get; }

        Guid AccessToken { get; }

        DateTime LastAccess { get; }

        void MarkAsAccessed();
    }
}
