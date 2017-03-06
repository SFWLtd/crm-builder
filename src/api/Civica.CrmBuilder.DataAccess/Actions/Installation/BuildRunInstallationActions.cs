using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Entities;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Settings;

namespace Civica.CrmBuilder.DataAccess.Actions.Installation
{
    public static class BuildRunInstallationActions
    {
        public static DataAccessAction CreateEntity()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateEntity<BuildRun>();
            });
        }

        public static DataAccessAction CreateStartTimeProperty()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<BuildRun, DateTime>(e => e.StartTime);
            });
        }

        public static DataAccessAction CreateFinishTimeProperty()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<BuildRun, DateTime>(e => e.FinishTime);
            });
        }

        public static DataAccessAction CreateStatusProperty()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<BuildRun, BuildRunStatus>(e => e.Status);
            });
        }

        public static DataAccessAction CreateRelationshipWithBuildRunMessageEntity()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);

                customizationClient.CreateOneToManyRelationship<Build, BuildRun>(
                    br => br.Build,
                    CrmPlusPlus.Sdk.EntityAttributes.Metadata.AttributeRequiredLevel.ApplicationRequired, "buil");
            });
        }

        public static DataAccessAction DeleteEntity()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.Delete<BuildRun>();
            });
        }
    }
}
