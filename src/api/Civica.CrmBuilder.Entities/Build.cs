using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmBuilder.Entities.Validation;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk.EntityAttributes;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.Metadata;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.PropertyTypes;

namespace Civica.CrmBuilder.Entities
{
    [EntityName("buil_build")]
    [EntityInfo("Build", OwnershipType.UserOwned, "Builds", "contains information regarding CRM Builder builds")]
    public class Build : CrmPlusPlusEntity, IValidatable
    {
        public Build()
        {
        }

        public Build(Guid id) :base(id)
        {
        }

        [PropertyName("buil_name")]
        [PropertyInfo("Name", AttributeRequiredLevel.ApplicationRequired, "The name of the build")]
        [String(100, StringFormatName.Text)]
        public string Name { get; set; }

        [PropertyName("buil_versioningtype")]
        [PropertyInfo("Build versioning type", AttributeRequiredLevel.ApplicationRequired, "The type of build versioning to use")]
        [OptionSet]
        public BuildVersioningType BuildVersioningType { get; set; }

        [PropertyName("buil_versionmajor")]
        [PropertyInfo("Version Major", AttributeRequiredLevel.ApplicationRequired, "The major version of the build")]
        [Integer(999, 0, IntegerFormat.None)]
        public int VersionMajor { get; set; }

        [PropertyName("buil_versionminor")]
        [PropertyInfo("Version Minor", AttributeRequiredLevel.ApplicationRequired, "The minor version of the build")]
        [Integer(999, 0, IntegerFormat.None)]
        public int VersionMinor { get; set; }

        [PropertyName("buil_targetenvauthtype")]
        [PropertyInfo("Target Environment authentication type", AttributeRequiredLevel.None, "The authentication type of the target environment")]
        [OptionSet]
        public AuthenticationType TargetEnvironmentAuthenticationType { get; set; }

        [PropertyName("buil_targetenvcrmurl")]
        [PropertyInfo("Target environment CRM Url", AttributeRequiredLevel.None, "The target environment URL")]
        [String(99, StringFormatName.Url)]
        public string TargetEnvironmentCrmUrl { get; set; }

        [PropertyName("buil_targetenvemail")]
        [PropertyInfo("Target environment email address", AttributeRequiredLevel.None, "The target environment email address")]
        [String(99, StringFormatName.Email)]
        public string TargetEnvironmentEmail { get; set; }

        [PropertyName("buil_targetenvdomain")]
        [PropertyInfo("Target environment Domain", AttributeRequiredLevel.None, "The target environment domain")]
        [String(99, StringFormatName.Text)]
        public string TargetEnvironmentDomain { get; set; }

        [PropertyName("buil_targetenvusername")]
        [PropertyInfo("Target environment username", AttributeRequiredLevel.None, "The target environment username")]
        [String(99, StringFormatName.Text)]
        public string TargetEnvironmentUsername { get; set; }

        [PropertyName("buil_targetenvpassword")]
        [PropertyInfo("Target environment password", AttributeRequiredLevel.None, "The target environment password")]
        [String(3999, StringFormatName.Text)]
        public string Password { get; set; }

        [PropertyName("buil_solutionid")]
        [PropertyInfo("Solution Id", AttributeRequiredLevel.ApplicationRequired, "The id of the solution the build relates to")]
        [String(36, StringFormatName.Text)]
        public string SolutionId { get; set; }

        public IEnumerable<BuildRun> BuildRunInstances { get; set; }

        public void Validate()
        {
            Guard.This(Name).AgainstNullOrEmpty().AgainstInvalidLength(1, 100);
            Guard.This(VersionMajor).AgainstInvalidRange(0, 999);
            Guard.This(VersionMinor).AgainstInvalidRange(0, 999);
            Guard.This(TargetEnvironmentCrmUrl).AgainstInvalidLength(1, 99);
            Guard.This(SolutionId).AgainstNonGuidFormat();

            switch (TargetEnvironmentAuthenticationType)
            {
                case AuthenticationType.Dynamics365:
                    Guard.This(TargetEnvironmentEmail).AgainstInvalidLength(1, 99);
                    break;
                default:
                    Guard.This(TargetEnvironmentDomain).AgainstInvalidLength(1, 99);
                    Guard.This(TargetEnvironmentUsername).AgainstInvalidLength(1, 99);
                    break;
            }
        }
    }
}
