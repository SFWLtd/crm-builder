using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Componentization;
using Civica.CrmBuilder.Domain.Solutions;

namespace Civica.CrmBuilder.Domain.Dtos
{
    public class SolutionDto : IPopulatableFrom<IDomainComponent<Solution>>
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Id { get; set; }

        public string Version { get; set; }

        public void PopulateFrom(IDomainComponent<Solution> source)
        {
            var entity = source.ReturnThis(s => s.Entity);

            Name = entity.Name;
            DisplayName = entity.DisplayName;
            Id = entity.Id.ToString();
            Version = entity.Version;
        }
    }
}
