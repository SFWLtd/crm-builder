using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Core.Protection;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmBuilder.Entities;

namespace Civica.CrmBuilder.Api.ApiRequests
{
    public class UpdateBuildRequest : IMappableTo<Build>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public int VersionMajor { get; set; }

        public int VersionMinor { get; set; }

        public string SolutionId { get; set; }

        public AuthenticationType AuthenticationType { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string Password { get; set; }

        public string Domain { get; set; }

        public string Url { get; set; }

        public Build Map()
        {
            Guard.This(Id).AgainstNonGuidFormat();

            return new Build(Guid.Parse(Id))
            {
                Name = Name,
                TargetEnvironmentAuthenticationType = AuthenticationType,
                TargetEnvironmentCrmUrl = Url,
                TargetEnvironmentDomain = Domain,
                TargetEnvironmentEmail = EmailAddress,
                TargetEnvironmentUsername = UserName,
                ProtectedTargetEnvironmentPassword = Protector.ProtectString(Password),
                SolutionId = SolutionId,
                VersionMajor = VersionMajor,
                VersionMinor = VersionMinor,
                BuildVersioningType = BuildVersioningType
            };
        }
    }
}