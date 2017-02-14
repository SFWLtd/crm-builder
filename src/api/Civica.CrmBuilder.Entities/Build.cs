using System;
using System.Collections;
using System.Collections.Generic;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk.EntityAttributes;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.Metadata;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.PropertyTypes;

namespace Civica.CrmBuilder.Entities
{
    [EntityName("buil_build")]
    [EntityInfo("Build", OwnershipType.UserOwned, "Builds", "contains information regarding CRM Builder builds")]
    public class Build : CrmPlusPlusEntity
    {
        private string name;
        private int versionMajor;
        private int versionMinor;
        private string crmUrl;
        private string email;
        private string domain;
        private string username;

        public Build()
        {
        }

        public Build(Guid id) :base(id)
        {
        }

        [PropertyName("buil_name")]
        [PropertyInfo("Name", AttributeRequiredLevel.ApplicationRequired, "The name of the build")]
        [String(100, StringFormatName.Text)]
        public string Name
        {
            get { return name; }
            set
            {
                Guard.This(value).AgainstNullOrEmpty();
                Guard.This(value).AgainstInvalidLength(1, 100);
                name = value;
            }
        }

        [PropertyName("buil_versioningtype")]
        [PropertyInfo("Build versioning type", AttributeRequiredLevel.ApplicationRequired, "The type of build versioning to use")]
        [OptionSet]
        public BuildVersioningType BuildVersioningType { get; set; }

        [PropertyName("buil_versionmajor")]
        [PropertyInfo("Version Major", AttributeRequiredLevel.ApplicationRequired, "The major version of the build")]
        [Integer(999, 0, IntegerFormat.None)]
        public int VersionMajor
        {
            get { return versionMajor; }
            set
            {
                Guard.This(value).AgainstInvalidRange(0, 999);
                versionMajor = value;
            }
        }

        [PropertyName("buil_versionminor")]
        [PropertyInfo("Version Minor", AttributeRequiredLevel.ApplicationRequired, "The minor version of the build")]
        [Integer(999, 0, IntegerFormat.None)]
        public int VersionMinor
        {
            get { return versionMinor; }
            set
            {
                Guard.This(value).AgainstInvalidRange(0, 999);
                versionMinor = value;
            }
        }

        [PropertyName("buil_targetenvauthtype")]
        [PropertyInfo("Target Environment authentication type", AttributeRequiredLevel.None, "The authentication type of the target environment")]
        [OptionSet]
        public AuthenticationType TargetEnvironmentAuthenticationType { get; set; }

        [PropertyName("buil_targetenvcrmurl")]
        [PropertyInfo("Target environment CRM Url", AttributeRequiredLevel.None, "The target environment URL")]
        [String(99, StringFormatName.Url)]
        public string TargetEnvironmentCrmUrl
        {
            get { return crmUrl; }
            set
            {
                Guard.This(value).AgainstInvalidLength(1, 99);
                crmUrl = value;
            }
        }

        [PropertyName("buil_targetenvemail")]
        [PropertyInfo("Target environment email address", AttributeRequiredLevel.None, "The target environment email address")]
        [String(99, StringFormatName.Email)]
        public string TargetEnvironmentEmail
        {
            get { return email; }
            set
            {
                Guard.This(value).AgainstInvalidLength(1, 99);
                email = value;
            }
        }

        [PropertyName("buil_targetenvdomain")]
        [PropertyInfo("Target environment Domain", AttributeRequiredLevel.None, "The target environment domain")]
        [String(99, StringFormatName.Text)]
        public string TargetEnvironmentDomain
        {
            get { return domain; }
            set
            {
                Guard.This(value).AgainstInvalidLength(1, 99);
                domain = value;
            }
        }

        [PropertyName("buil_targetenvusername")]
        [PropertyInfo("Target environment username", AttributeRequiredLevel.None, "The target environment username")]
        [String(99, StringFormatName.Text)]
        public string TargetEnvironmentUsername
        {
            get { return username; }
            set
            {
                Guard.This(value).AgainstInvalidLength(1, 99);
                username = value;
            }
        }

        [PropertyName("buil_targetenvpassword")]
        [PropertyInfo("Target environment password", AttributeRequiredLevel.None, "The target environment password")]
        [String(3999, StringFormatName.Text)]
        public string ProtectedTargetEnvironmentPassword { get; set; }

        public IEnumerable<BuildRun> BuildRunInstances { get; set; }
    }
}
