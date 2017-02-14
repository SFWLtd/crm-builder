using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Dtos;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class NewBuildRequest : IMappableTo<AuthenticationDto>
    {
        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public int VersionMajor { get; set; }

        public int VersionMinor { get; set; }

        public AuthenticationType AuthenticationType { get; set; }

        public string SolutionId { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string Password { get; set; }

        public string Domain { get; set; }

        public string Url { get; set; }

        public AuthenticationDto Map()
        {
            return new AuthenticationDto
            {
                AuthenticationType = AuthenticationType,
                Url = Url,
                Domain = Domain,
                EmailAddress = EmailAddress,
                Password = Password,
                UserName = UserName,
            };
        }
    }
}