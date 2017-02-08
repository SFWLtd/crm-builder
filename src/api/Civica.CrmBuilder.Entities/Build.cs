using Civica.CrmBuilder.Core.Enums;
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
        [PropertyName("buil_name")]
        [PropertyInfo("Name", AttributeRequiredLevel.ApplicationRequired, "The name of the build")]
        [String(100, StringFormatName.Text)]
        public string Name { get; set; }

        [PropertyName("buil_versioningtype")]
        [PropertyInfo("Build versioning type", AttributeRequiredLevel.ApplicationRequired, "The type of build versioning to use")]
        [OptionSet()]
        public BuildVersioningType BuildVersioningType { get; set; }

        [PropertyName("buil_versionmajor")]
        [PropertyInfo("Version Major", AttributeRequiredLevel.ApplicationRequired, "The major version of the build")]
        [Integer(999, 0, IntegerFormat.None)]
        public int VersionMajor { get; set; }

        [PropertyName("buil_versionminor")]
        [PropertyInfo("Version Minor", AttributeRequiredLevel.ApplicationRequired, "The minor version of the build")]
        [Integer(999, 0, IntegerFormat.None)]
        public int VersionMinor { get; set; }
    }
}
