using System;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
{
    public class AddMajorAndMinorVersionToBuild : InstallationVersion
    {
        public AddMajorAndMinorVersionToBuild()
            :base(Version.Parse("0.0.39.1"))
        {
            RegisterComponents();
        }

        public void RegisterComponents()
        {
            RegisterNextComponent(CreateMajorVersionProperty());
            RegisterNextComponent(CreateMinorVersionProperty());
        }

        private InstallationComponent CreateMajorVersionProperty()
        {
            return new InstallationComponent(
                "Creating major version property",
                BuildInstallationActions.CreateMajorVersionField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent CreateMinorVersionProperty()
        {
            return new InstallationComponent(
                "Creating minor version property",
                BuildInstallationActions.CreateMinorVersionField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }
    }
}
