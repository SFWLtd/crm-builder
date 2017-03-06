using System;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
{
    public class CreateBuildEntity : InstallationVersion
    {
        public CreateBuildEntity()
            : base(new Version(0, 0, 27, 1))
        {
            RegisterComponents();
        }

        private void RegisterComponents()
        {
            var createEntity = new InstallationComponent("Creating build entity",
                BuildInstallationActions.CreateEntity(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());

            var createName = new InstallationComponent("Creating build entity name",
                BuildInstallationActions.CreateNameField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing()); // Rollback is covered by deletion of entity in first component

            RegisterNextComponent(createEntity);
            RegisterNextComponent(createName);
        }
    }
}
