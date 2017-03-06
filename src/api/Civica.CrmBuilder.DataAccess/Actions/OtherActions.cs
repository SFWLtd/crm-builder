using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.DataAccess.Actions
{
    public static class OtherActions
    {
        public static DataAccessAction DoNothing()
        {
            return new DataAccessAction((ICrmPlusPlus crmPlusPlus) => { });
        }
    }
}
