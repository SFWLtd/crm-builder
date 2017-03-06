using Civica.CrmBuilder.Entities;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Settings;

namespace Civica.CrmBuilder.DataAccess.Actions.Installation
{
    public class BuildRunMessageInstallationActions
    {
        public static DataAccessAction CreateEntity()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateEntity<BuildRunMessage>();
            });
        }

        public static DataAccessAction CreateMessageProperty()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<BuildRunMessage, string>(e => e.Message);
            });
        }

        public static DataAccessAction CreateOrderProperty()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<BuildRunMessage, int>(e => e.Order);
            });
        }

        public static DataAccessAction DeleteEntity()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.Delete<BuildRunMessage>();
            });
        }
    }
}
