using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Authentication;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class NewSessionRequest : IMappableTo<IClient>
    {
        public AuthenticationType AuthenticationType { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string Password { get; set; }

        public string Domain { get; set; }

        public string Url { get; set; }

        public IClient Map()
        {
            switch (AuthenticationType)
            {
                case AuthenticationType.Dynamics365:
                    return new CrmClient(new CrmConnectionString(Url, EmailAddress, Password));
                default: return new CrmClient(new CrmConnectionString(Url, Domain, UserName, Password));
            }

            throw new ArgumentException("Unrecognized authentication type");
        }
    }
}
