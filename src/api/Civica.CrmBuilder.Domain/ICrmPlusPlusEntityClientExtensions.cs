using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain
{
    public static class ICrmPlusPlusEntityClientExtensions
    {
        public static void DoNothing(this ICrmPlusPlusEntityClient entityClient)
        {
            return;
        }
    }
}
