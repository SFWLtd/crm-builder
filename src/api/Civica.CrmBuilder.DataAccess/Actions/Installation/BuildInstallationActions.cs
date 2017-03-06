using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Entities;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Settings;

namespace Civica.CrmBuilder.DataAccess.Actions
{
    public static class BuildInstallationActions
    {
        public static DataAccessAction CreateEntity()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateEntity<Build>();
            });
        }

        public static DataAccessAction CreateNameField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, string>(b => b.Name);
            });
        }

        public static DataAccessAction CreateSolutionIdField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, string>(b => b.SolutionId);
            });
        }

        public static DataAccessAction CreateBuildVersioningTypeField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, BuildVersioningType>(b => b.BuildVersioningType);
            });
        }

        public static DataAccessAction CreateMajorVersionField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, int>(b => b.VersionMajor);
            });
        }

        public static DataAccessAction CreateMinorVersionField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, int>(b => b.VersionMinor);
            });
        }

        public static DataAccessAction CreateTargetAuthenticationTypeField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, AuthenticationType>(b => b.TargetEnvironmentAuthenticationType);
            });
        }

        public static DataAccessAction CreateTargetCrmUrlField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, string>(b => b.TargetEnvironmentCrmUrl);
            });
        }

        public static DataAccessAction CreateTargetEmailField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, string>(b => b.TargetEnvironmentEmail);
            });
        }

        public static DataAccessAction CreateTargetDomainField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, string>(b => b.TargetEnvironmentDomain);
            });
        }

        public static DataAccessAction CreateTargetUsernameField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, string>(b => b.TargetEnvironmentUsername);
            });
        }

        public static DataAccessAction CreateTargetPasswordField()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);
                customizationClient.CreateProperty<Build, string>(b => b.ProtectedTargetEnvironmentPassword);
            });
        }

        public static DataAccessAction CreateRelationshipWithBuildRunEntity()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var customizationClient = crm.GetCustomizationClientForSolution(PublisherSettings.Default, SolutionSettings.Default);

                customizationClient.CreateOneToManyRelationship<Build, BuildRun>(
                    br => br.Build,
                    CrmPlusPlus.Sdk.EntityAttributes.Metadata.AttributeRequiredLevel.ApplicationRequired, "buil");
            });
        }
    }
}
