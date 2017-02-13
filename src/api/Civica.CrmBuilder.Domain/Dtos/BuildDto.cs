using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Core.Protection;
using Civica.CrmBuilder.Core.Validation;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class BuildDto : IMappableTo<Entities.Build>, IPopulatableFrom<Entities.Build>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public BuildVersioningType BuildVersioningType { get; set; }

        public int VersionMajor { get; set; }

        public int VersionMinor { get; set; }

        public AuthenticationType TargetAuthenticationType { get; set; }

        public string TargetCrmUrl { get; set; }

        public string TargetDomain { get; set; }

        public string TargetUsername { get; set; }

        public string TargetEmailAddress { get; set; }

        public string TargetPassword { get; set; }

        public void PopulateFrom(Entities.Build source)
        {
            Id = source.Id.ToString();
            Name = source.Name;
            BuildVersioningType = source.BuildVersioningType;
            VersionMajor = source.VersionMajor;
            VersionMinor = source.VersionMinor;
            TargetAuthenticationType = source.TargetEnvironmentAuthenticationType;
            TargetCrmUrl = source.TargetEnvironmentCrmUrl;
            TargetDomain = source.TargetEnvironmentDomain;
            TargetEmailAddress = source.TargetEnvironmentEmail;
            TargetPassword = Protector.UnprotectString(source.ProtectedTargetEnvironmentPassword);
        }

        public Entities.Build Map()
        {
            Guard.This(TargetPassword)
                .AgainstNullOrEmpty();

            var id = string.IsNullOrEmpty(Id)
                ? Guid.NewGuid()
                : Guid.Parse(Id);

            var entity = new Entities.Build(id)
            {
                Name = Name,
                BuildVersioningType = BuildVersioningType,
                VersionMajor = VersionMajor,
                VersionMinor = VersionMinor,
                TargetEnvironmentAuthenticationType = TargetAuthenticationType,
                TargetEnvironmentCrmUrl = TargetCrmUrl,
                ProtectedTargetEnvironmentPassword = Protector.ProtectString(TargetPassword)
            };


            switch (TargetAuthenticationType)
            {
                case AuthenticationType.Dynamics365:
                    entity.TargetEnvironmentEmail = TargetEmailAddress;
                    break;
                default:
                    entity.TargetEnvironmentDomain = TargetDomain;
                    entity.TargetEnvironmentUsername = TargetUsername;
                    break;
            }

            return entity;
        }
    }
}
