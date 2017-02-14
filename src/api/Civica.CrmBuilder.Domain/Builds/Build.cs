using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Protection;
using Civica.CrmBuilder.Domain.Dtos;

namespace Civica.CrmBuilder.Domain.Build
{
    public class Build
    {
        internal Entities.Build Entity;

        internal Build(Entities.Build entity)
        {
            Entity = entity;
        }

        public void SetName(string name)
        {
            Entity.Name = name;
        }

        public void SetBuildVersioningType(BuildVersioningType buildVersioningType)
        {
            Entity.BuildVersioningType = buildVersioningType;
        }

        public void SetVersion(int versionMajor, int versionMinor)
        {
            Entity.VersionMajor = versionMajor;
            Entity.VersionMinor = versionMinor;
        }

        public void SetTargetEnvironment(AuthenticationDto authenticationDto)
        {
            Entity.TargetEnvironmentAuthenticationType = authenticationDto.AuthenticationType;
            Entity.TargetEnvironmentCrmUrl = authenticationDto.Url;
            Entity.ProtectedTargetEnvironmentPassword = Protector.ProtectString(authenticationDto.Password);

            switch (authenticationDto.AuthenticationType)
            {
                case AuthenticationType.Dynamics365:
                    Entity.TargetEnvironmentEmail = authenticationDto.EmailAddress;
                    break;
                default:
                    Entity.TargetEnvironmentUsername = authenticationDto.UserName;
                    Entity.TargetEnvironmentDomain = authenticationDto.Domain;
                    break;
            }
        }
    }
}
