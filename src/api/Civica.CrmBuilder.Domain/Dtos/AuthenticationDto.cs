using Civica.CrmBuilder.Core.Enums;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class AuthenticationDto
    {
        public AuthenticationType AuthenticationType { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string Password { get; set; }

        public string Domain { get; set; }

        public string Url { get; set; }
    }
}
