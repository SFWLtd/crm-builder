using System;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
{
    public class AddSolutionIdToBuildEntity : InstallationVersion
    {
        public AddSolutionIdToBuildEntity()
            : base(Version.Parse("0.0.45.2"))
        {
            RegisterComponents();
        }

        private void RegisterComponents()
        {
            RegisterNextComponent(CreateSolutionIdProperty());
        }

        private InstallationComponent CreateSolutionIdProperty()
        {
            return new InstallationComponent("Creating solution id property",
                BuildInstallationActions.CreateSolutionIdField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }
    }
}
