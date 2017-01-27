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
    }
}
