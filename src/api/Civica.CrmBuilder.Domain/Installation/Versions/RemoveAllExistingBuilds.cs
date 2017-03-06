using System;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
{
    public class RemoveAllExistingBuilds : InstallationVersion
    {
        public RemoveAllExistingBuilds()
            : base (Version.Parse("0.0.47.1"))
        {
            RegisterComponents();
        }

        private void RegisterComponents()
        {
            RegisterNextComponent(RemoveExistingBuilds());
        }

        private InstallationComponent RemoveExistingBuilds()
        {
            return new InstallationComponent("Removing any existing builds",
                OtherActions.DoNothing(),
                BuildActions.DeleteAllBuilds(),
                OtherActions.DoNothing());
        }
    }
}
