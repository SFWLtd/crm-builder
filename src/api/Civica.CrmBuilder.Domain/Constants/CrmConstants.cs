using Civica.CrmPlusPlus.Sdk.Settings;

namespace Civica.CrmBuilder.Domain.Constants
{
    public static class CrmConstants
    {
        public static string InitialSolutionVersion = "0.0.0.0";

        public static PublisherSettings DefaultPublisherSettings = new PublisherSettings("CRM Builder", "CrmBuilder", "buil", 48957);

        public static SolutionSettings DefaultSolutionSettings = new SolutionSettings("CrmBuilder", "CRM Builder", InitialSolutionVersion);
    }
}
