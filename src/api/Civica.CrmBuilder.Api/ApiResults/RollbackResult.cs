using System;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Api.ApiResults
{
    public class RollbackResult : IPopulatableFrom<Version>
    {
        public string CurrentVersion { get; set; }

        public void PopulateFrom(Version source)
        {
            CurrentVersion = source != null ? source.ToString() : null;
        }
    }
}