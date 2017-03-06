using System;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.DataAccess.Authentication
{
    public interface IClient 
    {
        Guid AccessToken { get; }

        DateTime LastAccess { get; }

        void MarkAsAccessed();
    }
}
