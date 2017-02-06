using System;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Api.ApiResults
{
    public class SessionTokenResult : IPopulatableFrom<IClient>
    {
        public Guid Token { get; set; }

        public void PopulateFrom(IClient source)
        {
            Token = source.AccessToken;
        }
    }
}