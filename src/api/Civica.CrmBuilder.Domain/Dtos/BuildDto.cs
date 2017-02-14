using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Core.Protection;
using Civica.CrmBuilder.Domain.Componentization;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class BuildDto : IPopulatableFrom<IDomainComponent<Build.Build>>
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

        public void PopulateFrom(IDomainComponent<Build.Build> source)
        {
            var entity = source.ReturnThis(b => b.Entity);

            Id = entity.Id.ToString();
            Name = entity.Name;
            BuildVersioningType = entity.BuildVersioningType;
            VersionMajor = entity.VersionMajor;
            VersionMinor = entity.VersionMinor;
            TargetAuthenticationType = entity.TargetEnvironmentAuthenticationType;
            TargetCrmUrl = entity.TargetEnvironmentCrmUrl;
            TargetDomain = entity.TargetEnvironmentDomain;
            TargetEmailAddress = entity.TargetEnvironmentEmail;
            TargetPassword = Protector.UnprotectString(entity.ProtectedTargetEnvironmentPassword);
        }
    }
}
