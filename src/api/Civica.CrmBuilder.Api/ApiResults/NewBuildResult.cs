using System;
using Civica.CrmBuilder.Domain.Builds;
using Civica.CrmBuilder.Core.Mapping;

namespace Civica.CrmBuilder.Api.ApiResults
{
    public class NewBuildResult : IPopulatableFrom<IBuild>
    {
        Guid Id { get; set; }

        public void PopulateFrom(IBuild source)
        {
            Id = source.Id;
        }
    }
}