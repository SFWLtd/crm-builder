using Civica.CrmPlusPlus.Sdk.EntityAttributes;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.Metadata;

namespace Civica.CrmBuilder.Entities
{
    [EntityInfo("Solution", OwnershipType.OrganizationOwned, null, null)]
    [EntityName("solution")]
    public class Solution : CrmPlusPlus.Sdk.DefaultEntities.Solution
    {
    }
}
