using System;
using Civica.CrmBuilder.Domain.Installation.Components;
using Civica.CrmBuilder.Entities;

namespace Civica.CrmBuilder.Domain.Installation.Versions
{
    public class CreateBuildEntity : InstallationVersion
    {
        public CreateBuildEntity()
            : base(new Version(0, 0, 27, 1))
        {
            RegisterComponents();
        }

        public void RegisterComponents()
        {
            var createEntity = new InstallationComponent("Creating build entity",
                client => client.CreateEntity<Build>(),
                client => client.Delete<Build>());

            var createName = new InstallationComponent("Creating build entity name",
                client => client.CreateProperty<Build, string>(p => p.Name),
                client => client.DoNothing()); // Rollback is covered by deletion of entity in first component

            base.RegisterNextComponent(createEntity);
            base.RegisterNextComponent(createName);
        }
    }
}
