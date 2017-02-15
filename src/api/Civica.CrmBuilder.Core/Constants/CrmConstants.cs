using System;
using Civica.CrmPlusPlus.Sdk.Settings;

namespace Civica.CrmBuilder.Core.Constants
{
    public static class CrmConstants
    {
        public static string InitialSolutionVersion = "0.0.0.0";

        public static string PublisherPrefix = "buil";

        public static PublisherSettings DefaultPublisherSettings = new PublisherSettings("CRM Builder", "CrmBuilder", PublisherPrefix, 48957);

        public static SolutionSettings DefaultSolutionSettings = new SolutionSettings("CrmBuilder", "CRM Builder", InitialSolutionVersion);

        public static DateTime CrmMinimum = new DateTime(1970, 1, 1, 0, 0, 0);
    }
}
